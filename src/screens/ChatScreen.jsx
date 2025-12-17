import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

import { MessageBubble } from "../components";
import { Input, Button } from "../components/ui";

import { API_URL, API_KEY } from "../libs/groq";
import { database } from "../network/firebase";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatScreen() {
  const chatCollectionName = "chat-ia";

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(database, chatCollectionName),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatHistory = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(chatHistory);

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      });
    });

    return unsubscribe;
  }, []);

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const text = inputText.trim();
    setInputText("");
    setLoading(true);

    try {
      // 1️⃣ Save user message
      await addDoc(collection(database, chatCollectionName), {
        text,
        role: "user",
        createdAt: serverTimestamp(),
      });

      const historyForAI = [
        ...messages.map((m) => ({
          role: m.role,
          content: m.text,
        })),
        { role: "user", content: text },
      ];

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: historyForAI,
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      const data = await response.json();
      const aiText = data.choices[0].message.content;

      await addDoc(collection(database, chatCollectionName), {
        text: aiText,
        role: "assistant",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble text={item.text} isMine={item.role === "user"} />
          )}
          contentContainerStyle={styles.messagesContainer}
          keyboardShouldPersistTaps="handled"
        />

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" />
          </View>
        )}

        {/* INPUT */}
        <View style={styles.inputRow}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Input
              placeholder="Escribe un mensaje..."
              value={inputText}
              onChangeText={setInputText}
            />
          </View>
          <Button icon="Send" iconOnly onPress={handleSend} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  messagesContainer: {
    padding: 10,
    paddingBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  loading: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

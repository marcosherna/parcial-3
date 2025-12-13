import { app } from "../../firebaseConfig";
import {
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "@firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const database = getFirestore(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const subscribe = (collectionName, setCallback, onError) => {
  const response = collection(database, collectionName);

  const unsubscribe = onSnapshot(
    response,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCallback(data);
    },
    (error) => {
      onError?.(error);
    }
  );

  return unsubscribe;
};

export const subscribeWithFilter = (
  collectionName,
  filters,
  setCallback,
  onError,
  orderByField,
  orderDirection = "asc",
  limitResults
) => {
  const ref = collection(database, collectionName);

  let q = query(ref);

  if (filters.length > 0) {
    const whereClauses = filters.map(([field, op, value]) =>
      where(field, op, value)
    );
    q = query(ref, ...whereClauses);
  }

  if (orderByField) {
    q = query(q, orderBy(orderByField, orderDirection));
  }

  if (limitResults) {
    q = query(q, limit(limitResults));
  }

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCallback(data);
    },
    (error) => {
      onError?.(error);
    }
  );

  return unsubscribe;
};

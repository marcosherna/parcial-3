import React, { useRef, useState, cloneElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

import { useTheme } from "../../hooks/useTheme";
import { spacing } from "../../resources/spacing";
import { fontSizes, fontWeights } from "../../resources/typography";

export function Tabs({
  tabs = [], // [{ key, title, icon?, content }]
  initialIndex = 0,
  onChange,
}) {
  const pagerRef = useRef(null);
  const [index, setIndex] = useState(initialIndex);
  const { theme } = useTheme();

  const handleTabPress = (i) => {
    pagerRef.current?.setPage(i);
    setIndex(i);
    onChange?.(i);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.outline }]}>
        {tabs.map((tab, i) => {
          const active = i === index;

          return (
            <TouchableOpacity
              key={tab.key ?? i}
              style={styles.tab}
              onPress={() => handleTabPress(i)}
              activeOpacity={0.8}
            >
              {/* Icon (opcional) */}
              {tab.icon &&
                cloneElement(tab.icon, {
                  color: active ? theme.primary : theme.secondaryText,
                  size: 20,
                })}

              {/* Title */}
              <Text
                style={[
                  styles.tabText,
                  {
                    color: active ? theme.primary : theme.secondaryText,
                    fontWeight: active
                      ? fontWeights.semibold
                      : fontWeights.medium,
                  },
                ]}
              >
                {tab.title}
              </Text>

              {/* Indicator */}
              {active && (
                <View
                  style={[styles.indicator, { backgroundColor: theme.primary }]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Content */}
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={initialIndex}
        onPageSelected={(e) => {
          const page = e.nativeEvent.position;
          setIndex(page);
          onChange?.(page);
        }}
      >
        {tabs.map((tab, i) => (
          <View key={tab.key ?? i} style={styles.page}>
            {tab.content}
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  tabText: {
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
  },
  indicator: {
    marginTop: spacing.xs,
    height: 2,
    width: "60%",
    borderRadius: 1,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
    padding: spacing.md,
  },
});

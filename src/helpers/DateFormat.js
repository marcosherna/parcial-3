export function formatDateTime(date) {
  if (!date) return "";

  const d = date.toDate ? date.toDate() : new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

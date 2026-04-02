import type { Locale } from "./locales";
import { messages, type Messages } from "./messages";

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}


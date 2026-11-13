import en from "./en.json";
import fa from "./fa.json";

export const messages = { fa, en } as const;

export type Messages = typeof en;

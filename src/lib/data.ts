import { Language } from "@/types";

const languages: Language[] = [
  {
    code: "en",
    label: "English",
    flag: "GB",
  },
  {
    code: "id",
    label: "Bahasa Indonesia",
    flag: "ID",
  },
];

export async function fetchLanguages(): Promise<Language[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(languages);
    }, 500);
  });
}
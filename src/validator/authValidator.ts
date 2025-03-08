import { LangOption } from "@/constants";
import getLanguage from "@/lib/language";
import { z } from "zod";

const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
export const AuthFormValidator = (isLogin: boolean, lang: LangOption) =>
  z.object({
    name: isLogin
      ? z.string().optional()
      : z.string()
        .min(1, getLanguage("zod.auth.name.min.message", lang as LangOption))
        .trim(),
    email: z.string()
      .min(1, getLanguage("zod.auth.email.min.message", lang as LangOption))
      .email(getLanguage("zod.auth.email.format.message", lang as LangOption))
      .toLowerCase()
      .trim(),
    password: isLogin
      ? z.string()
        .min(6, getLanguage("zod.auth.password.min.message", lang as LangOption))
        .trim()
      : z.string()
        .min(6, getLanguage("zod.auth.password.min.message", lang as LangOption))
        .regex(passwordRegex, getLanguage("zod.auth.password.regex.message", lang as LangOption))
        .trim(),
  });

export type ValidatedAuthFormData = z.infer<ReturnType<typeof AuthFormValidator>>;
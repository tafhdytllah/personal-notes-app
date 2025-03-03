import { z } from "zod";

export const NoteFormValidator = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
})
export type ValidatedNoteFormData = z.infer<typeof NoteFormValidator>

export const NoteFormDetailValidator = NoteFormValidator.extend({
  id: z.string(),
});
export type ValidatedNoteFormDetailData = z.infer<typeof NoteFormDetailValidator>
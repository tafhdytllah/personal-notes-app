import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormType, LangOption } from "@/constants";
import { ROUTES } from "@/constants/route";
import useNavigateTo from "@/hooks/useNavigateTo";
import { useNotes } from "@/hooks/useNotes";
import getLanguage from "@/lib/language";
import { createNote, editNote } from "@/services/NotesService";
import { Note } from "@/types/note";
import {
  NoteFormValidator,
  ValidatedNoteFormData,
  ValidatedNoteFormDetailData,
} from "@/validator/noteValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type NoteFormProps = {
  type: FormType;
  initialData: ValidatedNoteFormDetailData | null;
  language: LangOption;
};
const NoteForm = ({ type, initialData, language }: NoteFormProps) => {
  const { setNotes } = useNotes();
  const navigate = useNavigateTo();

  const editable = type === "NEW" || type === "EDIT";
  const redirectUrl = ROUTES["notes"];

  const defaultData: ValidatedNoteFormData = {
    title: initialData ? initialData.title : "",
    body: initialData ? initialData.body : "",
  };

  const form = useForm<z.infer<typeof NoteFormValidator>>({
    resolver: zodResolver(NoteFormValidator),
    defaultValues: { ...defaultData },
  });

  const isDataChanged = form.formState.isDirty;

  const saveAsNew = async (values: z.infer<typeof NoteFormValidator>) => {
    const mappedData: Note = {
      id: "",
      title: values.title ?? "",
      body: values.body ?? "",
      createdAt: "",
      archived: false,
    };

    try {
      const updatedNotes = await createNote(mappedData);
      setNotes(updatedNotes);
      navigate(redirectUrl);
    } catch (error) {
      console.error(error);
      navigate(redirectUrl);
    }
  };

  const saveAsEdit = async (values: z.infer<typeof NoteFormValidator>) => {
    if (!initialData?.id) return;

    const mappedData: Note = {
      id: initialData.id ?? "",
      title: values.title ?? "",
      body: values.body ?? "",
      createdAt: "",
      archived: false,
    };

    try {
      const updatedNotes = await editNote(mappedData);
      setNotes(updatedNotes);
      navigate(redirectUrl);
    } catch (error) {
      console.error(error);
      navigate(redirectUrl);
    }
  };

  const onSubmit = (values: z.infer<typeof NoteFormValidator>) => {
    if (type === "NEW") {
      saveAsNew(values);
    } else if (type === "EDIT") {
      saveAsEdit(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="container max-w-[50%] h-screen flex flex-col gap-2 space-y-2 ml-0 px-4 py-1 mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getLanguage(
                    `note.label.by-name.${field.name}`,
                    language as LangOption,
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={!editable}
                    placeholder={getLanguage(
                      `note.placeholder.by-name.${field.name}`,
                      language as LangOption,
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getLanguage(
                    `note.label.by-name.${field.name}`,
                    language as LangOption,
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={!editable}
                    placeholder={getLanguage(
                      `note.placeholder.by-name.${field.name}`,
                      language as LangOption,
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {editable && (
            <div className="container max-w-[50%] flex flex-row justify-start gap-2 mt-4">
              <Button
                className="w-full"
                type="button"
                variant={"outline"}
                onClick={() => navigate(redirectUrl)}
              >
                {getLanguage("button.cancel", language as LangOption)}
              </Button>
              <Button
                className="w-full"
                type="submit"
                disabled={!isDataChanged}
              >
                {getLanguage("button.save", language as LangOption)}
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};
export default NoteForm;

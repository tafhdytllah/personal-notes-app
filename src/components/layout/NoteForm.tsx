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
import { Textarea } from "@/components/ui/textarea";
import { FormType, LangOption } from "@/constants";
import { ROUTES } from "@/constants/route";
import { useLanguage } from "@/hooks/useLanguage";
import useNavigateTo from "@/hooks/useNavigateTo";
import { useNotes } from "@/hooks/useNotes";
import getLanguage from "@/lib/language";
import { Note } from "@/types/note";
import {
  NoteFormValidator,
  ValidatedNoteFormData,
  ValidatedNoteFormDetailData,
} from "@/validator/noteValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";

type NoteFormProps = {
  type: FormType;
  initialData: ValidatedNoteFormDetailData | null;
};
const NoteForm = ({ type, initialData }: NoteFormProps) => {
  const { language: lang } = useLanguage();
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

  const saveAsNew = (values: z.infer<typeof NoteFormValidator>) => {
    const mappedData: Note = {
      id: "",
      title: values.title ?? "",
      body: values.body ?? "",
      owner: "",
      createdAt: "",
      archived: false,
    };

    try {
      const updatedNotes = createNote(mappedData);
      setNotes(updatedNotes);
      navigate(redirectUrl);
    } catch (error) {
      console.error(error);
      navigate(redirectUrl);
    }
  };

  const saveAsEdit = (values: z.infer<typeof NoteFormValidator>) => {
    if (!initialData?.id) return;

    const mappedData: Note = {
      id: initialData.id ?? "",
      title: values.title ?? "",
      body: values.body ?? "",
      owner: "",
      createdAt: "",
      archived: false,
    };

    try {
      const updatedNotes = editNote(mappedData);
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
                    lang as LangOption,
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!editable}
                    placeholder={
                      initialData?.body ??
                      getLanguage(
                        `note.placeholder.by-name.${field.name}`,
                        lang as LangOption,
                      )
                    }
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
                    lang as LangOption,
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={!editable}
                    placeholder={
                      initialData?.body ??
                      getLanguage(
                        `note.placeholder.by-name.${field.name}`,
                        lang as LangOption,
                      )
                    }
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
                {getLanguage("button.cancel", lang as LangOption)}
              </Button>
              <Button
                className="w-full"
                type="submit"
                disabled={!isDataChanged}
              >
                {getLanguage("button.save", lang as LangOption)}
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

NoteForm.propTypes = {
  type: PropTypes.oneOf(["NEW", "EDIT", "VIEW"]).isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default NoteForm;

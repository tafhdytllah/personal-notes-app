import AuthLink from "@/components/AuthLink";
import Loading from "@/components/Loading";
import TitlePage from "@/components/TitlePage";
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
import { FormAuthType, LangOption } from "@/constants";
import { ROUTES } from "@/constants/route";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import useNavigateTo from "@/hooks/useNavigateTo";
import getLanguage from "@/lib/language";
import {
  AuthFormValidator,
  ValidatedAuthFormData,
} from "@/validator/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type AuthFormProps = {
  formAuthType: FormAuthType;
};
const AuthForm = ({ formAuthType }: AuthFormProps) => {
  const { language: lang } = useLanguage();
  const navigate = useNavigateTo();
  const { login, register, loading } = useAuth();
  const redirecMaintUrl = ROUTES["notes"];
  const redirecLogintUrl = ROUTES["login"];
  const redirecRegistertUrl = ROUTES["register"];

  const isLogin = formAuthType === "LOGIN";
  const authType = isLogin ? "login" : "register";

  const defaultData: Partial<ValidatedAuthFormData> = isLogin
    ? { email: "", password: "" }
    : { name: "", email: "", password: "" };

  const form = useForm<ValidatedAuthFormData>({
    resolver: zodResolver(AuthFormValidator(isLogin, lang as LangOption)),
    defaultValues: { ...defaultData },
  });
  const isDataChanged = form.formState.isDirty;

  const loginSubmit = async (values: ValidatedAuthFormData) => {
    const mappedData = {
      email: values.email ?? "",
      password: values.password ?? "",
    };

    try {
      const response = await login(mappedData);
      if (!response) {
        window.alert("Login gagal");
        return;
      }
      window.alert("Login berhasil");
      navigate(redirecMaintUrl);
    } catch (error) {
      console.error(error);
      window.alert("Login gagal");
      navigate(redirecLogintUrl);
    }
  };

  const registerSubmit = async (values: ValidatedAuthFormData) => {
    const mappedData = {
      name: values.name ?? "",
      email: values.email ?? "",
      password: values.password ?? "",
    };

    try {
      const response = await register(mappedData);
      if (!response) {
        window.alert("Register gagal");
        return;
      }
      window.alert("Register berhasil");
      navigate(redirecLogintUrl);
    } catch (error) {
      console.error(error);
      window.alert("Register gagal");
      navigate(redirecRegistertUrl);
    }
  };

  const onSubmit = (values: ValidatedAuthFormData) => {
    if (formAuthType === "LOGIN") {
      loginSubmit(values);
    } else if (formAuthType === "REGISTER") {
      registerSubmit(values);
    }
  };

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  return (
    <Form {...form}>
      <div className="max-w-[80%] mx-auto h-screen flex flex-col gap-8 py-4 items-center justify-start">
        <TitlePage
          title={getLanguage(`page.${authType}`, lang as LangOption)}
        />
        <form
          key={isLogin ? "login-form" : "register-form"}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-80"
        >
          {!isLogin && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {getLanguage(
                      `auth.label.by-name.${field.name}`,
                      lang as LangOption,
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={`form-item-${field.name}`}
                      placeholder={getLanguage(
                        `auth.placeholder.by-name.${field.name}`,
                        lang as LangOption,
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getLanguage(
                    `auth.label.by-name.${field.name}`,
                    lang as LangOption,
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    id={`form-item-${field.name}`}
                    placeholder={getLanguage(
                      `auth.placeholder.by-name.${field.name}`,
                      lang as LangOption,
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {getLanguage(
                    `auth.label.by-name.${field.name}`,
                    lang as LangOption,
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    id={`form-item-${field.name}`}
                    placeholder={getLanguage(
                      `auth.placeholder.by-name.${field.name}`,
                      lang as LangOption,
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={!isDataChanged}>
            {getLanguage("button.login", lang as LangOption)}
          </Button>
        </form>
        <AuthLink type={formAuthType} />
      </div>
    </Form>
  );
};

export default AuthForm;

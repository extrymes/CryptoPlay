"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().max(50, {
    message: "Email must be at most 50 characters.",
  }),
  password: z.string().max(50, {
    message: "Password must be at most 50 characters.",
  }),
});

export default function Login() {
  const t = useI18n();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>{t("login.welcomeBack")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>{t("login.email")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("login.emailExample")} />
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
                  <FormLabel>{t("login.password")}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-6">
              {t("login.login")}
            </Button>
            <div className="mt-3">
              {t("login.notAccountYet")}{" "}
              <Link href="/register" className="underline hover:opacity-80">
                {t("login.register")}
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

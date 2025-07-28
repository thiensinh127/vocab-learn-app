"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, GoalIcon } from "lucide-react";

import { AuthFormData, authSchema } from "@/lib/schema";

interface Props {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function SignInFormModal({
  open,
  onClose,
  onSwitchToRegister,
}: Props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: AuthFormData) => {
    const res = await signIn("credentials", { ...data, redirect: false });

    if (res?.error) {
      toast.error("Email or password is incorrect");
    } else {
      toast.success("Log in successfully");
      router.refresh();
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-semibold text-gray-900">
              Log in
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 text-gray-500"
            >
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <span
                          className="absolute right-2 top-2.5 cursor-pointer text-muted-foreground"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <div className="text-right text-sm mt-1">
                      <a
                        href="/forgot-password"
                        className="text-primary hover:underline"
                      >
                        Forgot your password
                      </a>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </Form>

          <Divider />

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-gray-900"
            onClick={() => signIn("google")}
          >
            <GoalIcon className="w-4 h-4" />
            Log in with Google
          </Button>

          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-sm text-muted-foreground">
              Don’t have an account?
            </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary hover:underline text-sm cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const Divider = () => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">or</span>
      </div>
    </div>
  );
};

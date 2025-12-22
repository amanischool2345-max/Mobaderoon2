import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { z } from "zod";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, user } = useAuth();
  const [_, setLocation] = useLocation();

  if (user) {
    setLocation("/");
    return null;
  }

  const formSchema = insertUserSchema;
  const form = useForm<InsertUser>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: InsertUser) => {
    if (isLogin) {
      login.mutate(data);
    } else {
      register.mutate(data, {
        onSuccess: () => {
          // Optional: switch to login mode after successful registration
          setIsLogin(true);
          form.reset();
        }
      });
    }
  };

  const isPending = login.isPending || register.isPending;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-dot-pattern">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-8 md:p-10 relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />

            <div className="text-center mb-8 relative z-10">
              <h1 className="text-3xl font-bold font-display text-primary mb-2">
                {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "مرحباً بك مجدداً في منصة مبادرون" 
                  : "انضم إلينا وابدأ رحلتك في المبادرة"}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-muted rounded-xl mb-8 relative z-10">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                  isLogin 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                دخول
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                  !isLogin 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                تسجيل
              </button>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">اسم المستخدم</label>
                <input
                  {...form.register("username")}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="ادخل اسم المستخدم"
                  dir="rtl"
                />
                {form.formState.errors.username && (
                  <span className="text-xs text-destructive">{form.formState.errors.username.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">كلمة المرور</label>
                <input
                  type="password"
                  {...form.register("password")}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="••••••••"
                  dir="rtl"
                />
                {form.formState.errors.password && (
                  <span className="text-xs text-destructive">{form.formState.errors.password.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? "دخول" : "إنشاء الحساب"}
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-bold hover:underline"
                >
                  {isLogin ? "سجل الآن" : "سجل دخولك"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

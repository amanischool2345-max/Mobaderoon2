import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans" dir="rtl">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center text-white shadow-lg group-hover:shadow-primary/25 transition-all">
              <span className="font-bold text-xl">م</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-600 font-display">
              مبادرون
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              الرئيسية
            </Link>
            <Link href="/ideas" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/ideas' ? 'text-primary' : 'text-muted-foreground'}`}>
              الأفكار الإبداعية
            </Link>
            <Link href="/activities" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/activities' ? 'text-primary' : 'text-muted-foreground'}`}>
              معرض الفيديوهات
            </Link>
            <Link href="/wheel" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/wheel' ? 'text-primary' : 'text-muted-foreground'}`}>
              عجلة المبادرات
            </Link>
            <Link href="/stars" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/stars' ? 'text-primary' : 'text-muted-foreground'}`}>
              مبادرون مميزون
            </Link>
            <Link href="/about" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/about' ? 'text-primary' : 'text-muted-foreground'}`}>
              من نحن
            </Link>
            <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/contact' ? 'text-primary' : 'text-muted-foreground'}`}>
              اتصل بنا
            </Link>
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 pl-2 bg-secondary/10 rounded-full pr-4 py-1.5 border border-secondary/20">
                <span className="text-sm font-medium text-secondary-foreground">
                  مرحباً، {user.username}
                </span>
                <button
                  onClick={() => logout.mutate()}
                  className="p-2 rounded-full bg-white hover:bg-destructive hover:text-white text-muted-foreground transition-all shadow-sm"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium px-3 py-1.5 rounded-full bg-muted/50">
                  ضيف
                </span>
                <Link href="/auth">
                  <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200">
                    تسجيل الدخول
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg font-medium text-foreground">
                الرئيسية
              </Link>
              <Link href="/ideas" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg font-medium text-foreground">
                الأفكار الإبداعية
              </Link>
              <Link href="/activities" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg font-medium text-foreground">
                معرض الفيديوهات
              </Link>
              <Link href="/wheel" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg font-medium text-foreground">
                عجلة المبادرات
              </Link>
              <Link href="/stars" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg font-medium text-foreground">
                مبادرون مميزون
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg font-medium text-foreground">
                من نحن
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-lg font-medium text-foreground">
                اتصل بنا
              </Link>
              <div className="h-px bg-border my-2" />
              {user ? (
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">مرحباً، {user.username}</span>
                  <button 
                    onClick={() => logout.mutate()}
                    className="text-destructive font-medium"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground font-medium px-3 py-1.5 rounded-full bg-muted/50 inline-block">
                    ضيف
                  </div>
                  <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 rounded-lg bg-primary text-primary-foreground font-bold block">
                    تسجيل الدخول
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 منصة مبادرون - مدرسة الأميرة عالية الثانوية
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

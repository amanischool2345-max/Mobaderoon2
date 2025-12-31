import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles, BookOpen, Smile, Palette, Leaf, MessageCircle, Heart, Star, ExternalLink } from "lucide-react";

const INITIATIVES = [
  { 
    id: 1, 
    name: "مبادرة مدرستي أجمل", 
    icon: <Sparkles className="w-6 h-6 text-blue-500" />, 
    color: "from-blue-500/10 to-blue-500/5", 
    border: "border-blue-200",
    url: "https://mobaderoon.my.canva.site/#page-8"
  },
  { 
    id: 2, 
    name: "مبادرة مكتبة الصف الصغيرة", 
    icon: <BookOpen className="w-6 h-6 text-amber-500" />, 
    color: "from-amber-500/10 to-amber-500/5", 
    border: "border-amber-200",
    url: "https://mobaderoon.my.canva.site/#page-9"
  },
  { 
    id: 3, 
    name: "مبادرة صندوق الابتسامة", 
    icon: <Smile className="w-6 h-6 text-yellow-500" />, 
    color: "from-yellow-500/10 to-yellow-500/5", 
    border: "border-yellow-200",
    url: "https://mobaderoon.my.canva.site/#page-a"
  },
  { 
    id: 4, 
    name: "مبادرة جدار الإبداع", 
    icon: <Palette className="w-6 h-6 text-purple-500" />, 
    color: "from-purple-500/10 to-purple-500/5", 
    border: "border-purple-200",
    url: "https://mobaderoon.my.canva.site/#page-b"
  },
  { 
    id: 5, 
    name: "مبادرة رفقاً ببيئتنا", 
    icon: <Leaf className="w-6 h-6 text-green-500" />, 
    color: "from-green-500/10 to-green-500/5", 
    border: "border-green-200",
    url: "https://mobaderoon.my.canva.site/#page-c"
  },
  { 
    id: 6, 
    name: "مبادرة صوت الصف", 
    icon: <MessageCircle className="w-6 h-6 text-indigo-500" />, 
    color: "from-indigo-500/10 to-indigo-500/5", 
    border: "border-indigo-200",
    url: "https://mobaderoon.my.canva.site/#page-d"
  },
  { 
    id: 7, 
    name: "مبادرة الرفيق الداعم", 
    icon: <Heart className="w-6 h-6 text-pink-500" />, 
    color: "from-pink-500/10 to-pink-500/5", 
    border: "border-pink-200",
    url: "https://mobaderoon.my.canva.site/#page-e"
  },
  { 
    id: 8, 
    name: "مبادرة الصف المبدع", 
    icon: <Star className="w-6 h-6 text-orange-500" />, 
    color: "from-orange-500/10 to-orange-500/5", 
    border: "border-orange-200",
    url: "https://mobaderoon.my.canva.site/#page-f"
  }
];

export default function InitiativeGuide() {
  return (
    <Layout>
      <section className="relative min-h-screen py-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-display">
              دليل مبادراتي الإبداعية
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اضغطي على اسم المبادرة لمعرفة كيفية تنفيذها وتفاصيل العمل عليها
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {INITIATIVES.map((initiative, index) => (
              <motion.a
                key={initiative.id}
                href={initiative.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative group p-6 rounded-2xl border ${initiative.border} bg-gradient-to-br ${initiative.color} dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all flex items-center gap-6`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {initiative.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground/50 font-display">
                        {String(initiative.id).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {initiative.name}
                      </h3>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 text-center"
          >
            <Link href="/wheel">
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-x-1">
                <span>العودة لعجلة المبادرات</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

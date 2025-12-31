import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { 
  ArrowRight, Sparkles, BookOpen, Smile, Palette, 
  Leaf, MessageCircle, Heart, Star, X, Info
} from "lucide-react";
import { useState } from "react";

const INITIATIVES = [
  { 
    id: 1, 
    name: "مبادرة مدرستي أجمل", 
    icon: <Sparkles className="w-6 h-6 text-blue-500" />, 
    color: "from-blue-500/10 to-blue-500/5", 
    border: "border-blue-200",
    details: "تهدف هذه المبادرة إلى تحسين المظهر الجمالي للمدرسة من خلال زراعة الأشجار، تزيين الجدران، والحفاظ على النظافة العامة لتعزيز البيئة التعليمية."
  },
  { 
    id: 2, 
    name: "مبادرة مكتبة الصف الصغيرة", 
    icon: <BookOpen className="w-6 h-6 text-amber-500" />, 
    color: "from-amber-500/10 to-amber-500/5", 
    border: "border-amber-200",
    details: "تسعى المبادرة لإنشاء ركن للقراءة داخل كل صف يحتوي على مجموعة متنوعة من القصص والكتب لتعزيز ثقافة القراءة لدى الطالبات."
  },
  { 
    id: 3, 
    name: "مبادرة صندوق الابتسامة", 
    icon: <Smile className="w-6 h-6 text-yellow-500" />, 
    color: "from-yellow-500/10 to-yellow-500/5", 
    border: "border-yellow-200",
    details: "مبادرة لنشر الإيجابية والمودة بين الطالبات من خلال تبادل رسائل التشجيع والهدايا الرمزية البسيطة التي ترسم الابتسامة."
  },
  { 
    id: 4, 
    name: "مبادرة جدار الإبداع", 
    icon: <Palette className="w-6 h-6 text-purple-500" />, 
    color: "from-purple-500/10 to-purple-500/5", 
    border: "border-purple-200",
    details: "تخصيص مساحة لعرض المواهب الفنية والأدبية للطالبات، حيث يمكنهن تعليق لوحاتهن، قصائدهن، ومبتكراتهن اليدوية."
  },
  { 
    id: 5, 
    name: "مبادرة رفقاً ببيئتنا", 
    icon: <Leaf className="w-6 h-6 text-green-500" />, 
    color: "from-green-500/10 to-green-500/5", 
    border: "border-green-200",
    details: "تركز على إعادة التدوير، تقليل استهلاك الطاقة، ونشر الوعي البيئي بين الطالبات للحفاظ على موارد كوكبنا."
  },
  { 
    id: 6, 
    name: "مبادرة صوت الصف", 
    icon: <MessageCircle className="w-6 h-6 text-indigo-500" />, 
    color: "from-indigo-500/10 to-indigo-500/5", 
    border: "border-indigo-200",
    details: "منصة تتيح للطالبات التعبير عن آرائهن ومقترحاتهن لتطوير الصف والمدرسة، وتعزيز ثقافة الحوار البناء."
  },
  { 
    id: 7, 
    name: "مبادرة الرفيق الداعم", 
    icon: <Heart className="w-6 h-6 text-pink-500" />, 
    color: "from-pink-500/10 to-pink-500/5", 
    border: "border-pink-200",
    details: "برنامج لمساعدة الطالبات لبعضهن البعض في الدروس الصعبة أو تقديم الدعم المعنوي للزميلات عند الحاجة."
  },
  { 
    id: 8, 
    name: "مبادرة الصف المبدع", 
    icon: <Star className="w-6 h-6 text-orange-500" />, 
    color: "from-orange-500/10 to-orange-500/5", 
    border: "border-orange-200",
    details: "مسابقة دورية بين الصفوف لتحفيز الابتكار في تنظيم الصف، الالتزام بالأنظمة، والتعاون المثمر بين الطالبات."
  }
];

export default function InitiativeGuide() {
  const [selectedInitiative, setSelectedInitiative] = useState<typeof INITIATIVES[0] | null>(null);

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
              اضغطي على المبادرة لمعرفة تفاصيلها وكيفية العمل عليها
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {INITIATIVES.map((initiative, index) => (
              <motion.div
                key={initiative.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedInitiative(initiative)}
                className={`relative group p-6 rounded-2xl border ${initiative.border} bg-gradient-to-br ${initiative.color} dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-6`}
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
                    <Info className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.div>
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

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedInitiative && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedInitiative(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border-t-8 ${selectedInitiative.border.replace('border-', 'border-t-')}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {selectedInitiative.icon}
                </div>
                <button 
                  onClick={() => setSelectedInitiative(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4 font-display">
                {selectedInitiative.name}
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {selectedInitiative.details}
              </p>

              <button 
                onClick={() => setSelectedInitiative(null)}
                className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-foreground font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                تم
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

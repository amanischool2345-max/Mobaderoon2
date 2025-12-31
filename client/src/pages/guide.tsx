import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "wouter";

const INITIATIVES = [
  { id: 1, name: "مبادرة مدرستي أجمل" },
  { id: 2, name: "مبادرة مكتبة الصف الصغيرة" },
  { id: 3, name: "مبادرة صندوق الابتسامة" },
  { id: 4, name: "مبادرة جدار الإبداع" },
  { id: 5, name: "مبادرة رفقاً ببيئتنا" },
  { id: 6, name: "مبادرة صوت الصف" },
  { id: 7, name: "مبادرة الرفيق الداعم" },
  { id: 8, name: "مبادرة الصف المبدع" }
];

export default function InitiativeGuide() {
  return (
    <Layout>
      <section className="min-h-[80vh] flex flex-col items-center justify-center py-12 bg-gradient-to-b from-blue-100 to-white dark:from-slate-900 dark:to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-12 font-display">
              اعرف اكثر عن مبادرتي
            </h1>
          </motion.div>

          <div className="flex flex-col items-center gap-6 md:gap-8">
            {INITIATIVES.map((initiative, index) => (
              <motion.div
                key={initiative.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full max-w-2xl"
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-bold text-foreground hover:text-primary transition-colors cursor-default">
                    {initiative.id}. {initiative.name}
                  </span>
                  <div className="w-full max-w-md h-0.5 bg-foreground/20 mt-2" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <Link href="/wheel" className="text-primary font-bold text-xl hover:underline">
              عودة
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

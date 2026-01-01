import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Gamepad2, Leaf, Trash2, Droplets, ExternalLink } from "lucide-react";

export default function Games() {
  const games = [
    {
      title: "لعبة فرز النفايات",
      description: "تعلم كيفية فرز النفايات بشكل صحيح لحماية البيئة",
      icon: <Trash2 className="w-12 h-12 text-green-500" />,
      url: "https://wordwall.net/play/78722/786/115",
      color: "bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "توفير المياه",
      description: "ساعد في توفير المياه من خلال اتخاذ القرارات الصحيحة",
      icon: <Droplets className="w-12 h-12 text-blue-500" />,
      url: "https://wordwall.net/play/4b85c87706d34b3f81e35d105c363994",
      color: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "حماية البيئة",
      description: "اكتشف طرقاً جديدة لحماية الطبيعة والبيئة في مدرستك",
      icon: <Leaf className="w-12 h-12 text-emerald-500" />,
      url: "https://wordwall.net/play/44078/835",
      color: "bg-emerald-50 dark:bg-emerald-950/20"
    }
  ];

  return (
    <Layout>
      <section className="relative pt-20 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-6">
              <Gamepad2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-display">بادر و العب معنا</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">ألعاب تعليمية ممتعة لتعزيز قيم المبادرة والحفاظ على البيئة</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${game.color} rounded-3xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all group`}
              >
                <div className="p-8">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-4 bg-background rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                      {game.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 font-display">{game.title}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{game.description}</p>
                  
                  <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 text-center border border-dashed border-border mb-6">
                    <p className="text-sm text-muted-foreground mb-4">اضغط على الزر أدناه لبدء التحدي</p>
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                      <Gamepad2 className="w-5 h-5" />
                      العب الآن
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

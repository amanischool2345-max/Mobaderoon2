import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Gamepad2, Leaf, Trash2, Droplets } from "lucide-react";

export default function Games() {
  const games = [
    {
      title: "لعبة فرز النفايات",
      description: "تعلم كيفية فرز النفايات بشكل صحيح لحماية البيئة",
      icon: <Trash2 className="w-12 h-12 text-green-500" />,
      url: "https://wordwall.net/embed/787227d86f784e1b9b94680856012015",
      color: "bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "توفير المياه",
      description: "ساعد في توفير المياه من خلال اتخاذ القرارات الصحيحة",
      icon: <Droplets className="w-12 h-12 text-blue-500" />,
      url: "https://wordwall.net/embed/4b85c87706d34b3f81e35d105c363994",
      color: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "حماية الطبيعة",
      description: "اكتشف طرقاً جديدة لحماية الأشجار والنباتات في مدرستك",
      icon: <Leaf className="w-12 h-12 text-emerald-500" />,
      url: "https://wordwall.net/embed/40960533",
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
                  
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-white shadow-inner mb-6 border border-border/30">
                    <iframe
                      src={game.url}
                      className="w-full h-full"
                      allowFullScreen
                      frameBorder="0"
                    />
                  </div>

                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-background border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all text-center inline-block"
                  >
                    العب في صفحة كاملة
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-12 bg-gradient-to-br from-primary to-primary/80 text-white rounded-3xl text-center shadow-2xl shadow-primary/20"
          >
            <h2 className="text-3xl font-bold mb-4">هل استمتعت بالألعاب؟</h2>
            <p className="text-xl opacity-90 mb-8">حول ما تعلمته اليوم إلى واقع من خلال طرح مبادرة جديدة في مدرستك</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/ideas">
                <button className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-opacity-90 transition-all">اطرحي فكرة</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

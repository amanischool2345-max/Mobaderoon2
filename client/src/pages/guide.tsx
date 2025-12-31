import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Lightbulb, Users, Target, Rocket, CheckCircle2, Star } from "lucide-react";

export default function InitiativeGuide() {
  const sections = [
    {
      title: "ما هي المبادرة؟",
      content: "المبادرة هي فكرة خلاقة تتحول إلى عمل واقعي يهدف إلى حل مشكلة أو تطوير بيئة معينة. في مدرستنا، المبادرة هي صوتك الذي يغير الواقع للأفضل.",
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      color: "bg-amber-50 dark:bg-amber-950/20"
    },
    {
      title: "أهدافنا",
      content: "تمكين الطالبات من مهارات القيادة، تعزيز روح العمل الجماعي، وتحويل الأفكار النظرية إلى مشاريع عملية تخدم المجتمع المدرسي.",
      icon: <Target className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "خطوات التنفيذ",
      steps: [
        "تحديد المشكلة أو الفرصة المتاحة",
        "تكوين فريق عمل من الطالبات المبدعات",
        "رسم خطة عمل واضحة الملامح والأهداف",
        "الحصول على الدعم اللازم من إدارة المدرسة",
        "التنفيذ وتوثيق النتائج بالصور والفيديو"
      ],
      icon: <Rocket className="w-8 h-8 text-purple-500" />,
      color: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      title: "معايير النجاح",
      content: "الاستدامة، الأثر الإيجابي الملموس، والتعاون الفعال بين الفريق.",
      icon: <CheckCircle2 className="w-8 h-8 text-green-500" />,
      color: "bg-green-50 dark:bg-green-950/20"
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
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">دليل المبادرات الطلابية</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">تعلم كيف تحول فكرتك إلى واقع ملموس وتصبح جزءاً من التغيير في مدرستك</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${section.color} p-8 rounded-2xl border border-border/50 hover:shadow-lg transition-all`}
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-background rounded-xl shadow-sm">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                    {section.content && <p className="text-muted-foreground leading-relaxed">{section.content}</p>}
                    {section.steps && (
                      <ul className="space-y-3">
                        {section.steps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-3">
                            <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-12 bg-primary text-white rounded-3xl text-center shadow-2xl shadow-primary/20"
          >
            <Users className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">هل أنتِ مستعدة للبدء؟</h2>
            <p className="text-xl opacity-90 mb-8">شاركي فكرتك الآن في قسم الأفكار الإبداعية وابدأي رحلة التغيير</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/ideas" className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-opacity-90 transition-all">اطرحي فكرة</a>
              <a href="/activities" className="px-8 py-4 bg-primary-foreground/10 border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all">شاهدي المبادرات</a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

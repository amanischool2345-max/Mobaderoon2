import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-6">
              من نحن؟
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              منصة مبادرون هي منصة طلابية متخصصة في تعزيز روح المبادرة والريادة بين الطلاب والطالبات
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold font-display text-foreground mb-6">رؤيتنا</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                نؤمن أن كل طالب وطالبة لديهم القدرة على إحداث فرق في المجتمع. رؤيتنا هي بناء جيل من القادة والمبادرين القادرين على ابتكار حلول إبداعية للتحديات التي تواجه مجتمعهم.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                من خلال توفير منصة آمنة وداعمة، نساعد الطلاب على تحويل أفكارهم إلى واقع ملموس وتوثيق إنجازاتهم.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border/50"
            >
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">الهدف</h3>
                    <p className="text-muted-foreground">تعزيز ثقافة المبادرة والابتكار بين الطلاب</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Lightbulb className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">التمكين</h3>
                    <p className="text-muted-foreground">إمكانيات الطلاب على تطوير مشاريعهم</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">التعاون</h3>
                    <p className="text-muted-foreground">بناء فرق عمل متكاملة وفعالة</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-border/50 order-2 md:order-1"
            >
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Trophy className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">التوثيق</h3>
                    <p className="text-muted-foreground">حفظ وعرض الإنجازات والمشاريع الناجحة</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Lightbulb className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">التطوير</h3>
                    <p className="text-muted-foreground">صقل المهارات القيادية والريادية</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <ArrowRight className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">التأثير</h3>
                    <p className="text-muted-foreground">إحداث فرق إيجابي في المجتمع</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl font-bold font-display text-foreground mb-6">قيمنا</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                نعتقد أن النجاح يأتي من خلال الاجتهاد والعمل الجماعي والإبداع المستمر.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                كل طالب لديه إمكانات فريدة ودورنا هو مساعدتهم على اكتشافها وتطويرها بطريقة تساهم في بناء مستقبل أفضل للجميع.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              الفريق المشرف
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نحن مجموعة من المعلمين والمشرفين المتخصصين في تطوير المهارات القيادية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { role: "الإشراف العام", title: "مشرفة المنصة" },
              { role: "التطوير الأكاديمي", title: "منسق البرامج" },
              { role: "دعم الطلاب", title: "مرشد الطلاب" },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-xl p-6 text-center border border-border/50 hover:border-primary/20 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {String.fromCharCode(64 + i + 1)}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{member.title}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

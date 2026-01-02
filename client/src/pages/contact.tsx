import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "تم استلام رسالتك",
        description: "شكراً لتواصلك معنا. سنرد عليك قريباً",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
              اتصل بنا
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              لديك سؤال أو اقتراح؟ نود سماع منك. تواصل معنا في أي وقت.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold font-display text-foreground mb-8">معلومات التواصل</h2>
              </div>

              {[
                {
                  icon: <MapPin className="w-6 h-6 text-primary" />,
                  title: "العنوان",
                  content: "مدرسة الأميرة عالية الثانوية",
                  subtext: "عمان، الأردن"
                },
                {
                  icon: <Mail className="w-6 h-6 text-secondary" />,
                  title: "البريد الإلكتروني",
                  content: "info@mobaderoon.edu.jo",
                  subtext: "نرد على رسائلك خلال 24 ساعة"
                },
                {
                  icon: <Phone className="w-6 h-6 text-purple-500" />,
                  title: "الهاتف",
                  content: "+962 6 200 8860",
                  subtext: "ساعات العمل: الأحد - الخميس (8 صباحاً - 2 مساءً)"
                },
                {
                  icon: <MessageSquare className="w-6 h-6 text-amber-500" />,
                  title: "التواصل السريع",
                  content: "WhatsApp و Telegram",
                  subtext: "متاح لأسئلتك السريعة والعاجلة"
                },
              ].map((contact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    {contact.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{contact.title}</h3>
                    <p className="text-primary font-medium">{contact.content}</p>
                    <p className="text-sm text-muted-foreground">{contact.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50"
            >
              <h3 className="text-2xl font-bold font-display text-foreground mb-6">أرسل لنا رسالة</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="ادخل اسمك الكامل"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="example@email.com"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    الرسالة
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    placeholder="اكتب رسالتك هنا..."
                    dir="rtl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      إرسال الرسالة
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              الأسئلة الشائعة
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "كيف يمكنني التسجيل في المنصة؟", a: "يمكنك التسجيل بسهولة من خلال الضغط على زر تسجيل الدخول وإنشاء حساب جديد." },
              { q: "هل يمكنني الاستفادة من المنصة كضيف؟", a: "نعم، يمكنك تصفح المحتوى الأساسي كضيف. للمزيد من الميزات، يفضل التسجيل." },
              { q: "كيف أرفع مشروعي على المنصة؟", a: "بعد التسجيل، انتقل إلى صفحة المشاريع واتبع خطوات إنشاء مشروع جديد." },
              { q: "هل هناك رسوم للاستخدام؟", a: "لا، المنصة مجانية تماماً لجميع الطلاب والطالبات." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-lg p-6 border border-border/50 hover:border-primary/20 transition-all"
              >
                <h3 className="font-bold text-foreground mb-3">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Lightbulb, Video, Trophy } from "lucide-react";
import heroImage from "@assets/Gemini_Generated_Image_ne3hfzne3hfzne3h_1766749688875.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center md:text-right z-10"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary-foreground text-sm font-medium mb-6">
                مدرسة الأميرة عالية الثانوية
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-foreground leading-tight mb-6">
                منصة <span className="text-primary">مبادرون</span>
                <br />
                <span className="text-3xl md:text-5xl opacity-80 mt-2 block">حيث تبدأ الريادة</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 mx-auto md:mx-0">
                منصة طلابية تهدف إلى تعزيز روح المبادرة من خلال الأفكار، التنفيذ، والتوثيق الإبداعي. 
                انضم إلينا لنصنع مستقبلاً أفضل معاً.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Link href="/auth">
                  <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group">
                    تسجيل الدخول
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
                <button className="px-8 py-4 rounded-xl bg-white border-2 border-border text-foreground font-bold text-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  المتابعة كضيف
                </button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full max-w-lg md:max-w-none relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
              <img 
                src={heroImage}
                alt="طلاب مبادرون"
                className="relative z-10 w-full h-auto drop-shadow-2xl animate-float rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">ماذا نقدم في مبادرون؟</h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Lightbulb className="w-8 h-8 text-secondary" />,
                title: "أفكار إبداعية", 
                desc: "مساحة حرة لطرح الأفكار ومناقشتها وتطويرها" 
              },
              { 
                icon: <Video className="w-8 h-8 text-primary" />,
                title: "معرض الفيديوهات", 
                desc: "توثيق المبادرات الطلابية من خلال الفيديو" 
              },
              { 
                icon: <Trophy className="w-8 h-8 text-purple-500" />,
                title: "توثيق الإنجاز", 
                desc: "منصة لعرض وتوثيق نجاحات الطلاب ومشاريعهم" 
              },
              { 
                icon: <Star className="w-8 h-8 text-amber-500" />,
                title: "تطوير المهارات", 
                desc: "ورش عمل وتدريب لصقل مهارات القيادة والريادة" 
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 flex gap-4 justify-center flex-wrap">
            <Link href="/ideas">
              <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                الأفكار الإبداعية
              </button>
            </Link>
            <Link href="/activities">
              <button className="px-8 py-4 rounded-xl bg-secondary text-white font-bold text-lg shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-1 transition-all duration-300">
                معرض الفيديوهات
              </button>
            </Link>
            <Link href="/wheel">
              <button className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold text-lg shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/30 hover:-translate-y-1 transition-all duration-300">
                عجلة المبادرات
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

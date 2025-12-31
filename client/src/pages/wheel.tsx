import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Trophy } from "lucide-react";

const INITIATIVES = [
  "مبادرة مدرستي أجمل",
  "مبادرة مكتبة الصف الصغيرة",
  "مبادرة صندوق الابتسامة",
  "مبادرة جدار الإبداع",
  "مبادرة رفقاً ببيئتنا",
  "مبادرة الرفيق الداعم",
  "مبادرة أسبوع بلا هاتف",
  "مبادرة الصف المبدع"
];

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
  "#98D8C8", "#F7DC6F", "#BB8FCE", "#82E0AA"
];

export default function InitiativeWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;
    const sliceAngle = (2 * Math.PI) / INITIATIVES.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    INITIATIVES.forEach((initiative, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;

      // Draw Slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.stroke();

      // Draw Text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "white";
      ctx.font = "bold 14px Cairo";
      ctx.fillText(initiative, radius - 20, 5);
      ctx.restore();
    });
  }, []);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    
    const extraSpins = 5 + Math.random() * 5;
    const totalRotation = rotation + extraSpins * 360 + Math.random() * 360;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const actualRotation = totalRotation % 360;
      const index = Math.floor(((360 - (actualRotation % 360)) / 360) * INITIATIVES.length) % INITIATIVES.length;
      setResult(INITIATIVES[index]);
    }, 4000);
  };

  return (
    <Layout>
      <section className="relative overflow-hidden pt-20 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6"
          >
            عجلة المبادرات
          </motion.h1>
          <p className="text-lg text-muted-foreground mb-12">أدر العجلة لاكتشاف مبادرتك التالية!</p>

          <div className="relative max-w-md mx-auto aspect-square mb-12">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-8 h-8 bg-foreground clip-path-triangle rotate-180" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            </div>

            <motion.canvas
              ref={canvasRef}
              width={500}
              height={500}
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="w-full h-full rounded-full border-8 border-background shadow-2xl"
            />
            
            <button
              onClick={spin}
              disabled={isSpinning}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-background border-4 border-primary text-primary font-bold shadow-lg hover:scale-105 active:scale-95 transition-all z-30 disabled:opacity-50"
            >
              أدر
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary/20 rounded-2xl p-8 max-w-lg mx-auto mb-8"
              >
                <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">المبادرة المختارة:</h2>
                <p className="text-3xl font-bold text-primary">{result}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link 
              href="/guide"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-xl underline underline-offset-8 decoration-2 transition-all hover:scale-105"
            >
              اعرف اكثر عن مبادرتك
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

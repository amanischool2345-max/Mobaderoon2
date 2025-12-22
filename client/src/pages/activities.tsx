import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Plus, Trash2, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

interface Initiative {
  id: number;
  name: string;
  targetCategory: string;
  goal: string;
  timePeriod: string;
  createdAt?: Date;
}

export default function Activities() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    targetCategory: "",
    goal: "",
    timePeriod: "",
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const initiativesQuery = useQuery({
    queryKey: [api.initiatives.list.path],
    queryFn: async () => {
      const res = await fetch(api.initiatives.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch initiatives");
      return res.json() as Promise<Initiative[]>;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch(api.initiatives.create.path, {
        method: api.initiatives.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create initiative");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.initiatives.list.path] });
      toast({
        title: "تم إضافة المبادرة بنجاح",
        description: "تمت إضافة مبادرتك الجديدة",
      });
      setFormData({ name: "", targetCategory: "", goal: "", timePeriod: "" });
      setShowForm(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في إضافة المبادرة",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(api.initiatives.delete.path.replace(":id", String(id)), {
        method: api.initiatives.delete.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete initiative");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.initiatives.list.path] });
      toast({
        title: "تم حذف المبادرة",
        description: "تم حذف المبادرة بنجاح",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في حذف المبادرة",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
              الأنشطة الإبداعية
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              شارك مبادراتك وأنشطتك الإبداعية مع المنصة وأثر في مجتمعك
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Add Initiative Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              إضافة مبادرة
            </button>
          </motion.div>

          {/* Add Initiative Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50 mb-12"
            >
              <h2 className="text-2xl font-bold font-display text-foreground mb-6">إضافة مبادرة</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    اسم المبادرة
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="ادخل اسم المبادرة"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    الفئة المستهدفة
                  </label>
                  <select
                    name="targetCategory"
                    value={formData.targetCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    dir="rtl"
                  >
                    <option value="">اختر الفئة المستهدفة</option>
                    <option value="طلاب">طلاب</option>
                    <option value="طالبات">طالبات</option>
                    <option value="الجميع">الجميع</option>
                    <option value="الموهوبين">الموهوبين</option>
                    <option value="المهتمين بالقيادة">المهتمين بالقيادة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    هدف المبادرة
                  </label>
                  <textarea
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    placeholder="اشرح الهدف من المبادرة..."
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    الفترة الزمنية
                  </label>
                  <input
                    type="text"
                    name="timePeriod"
                    value={formData.timePeriod}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="مثال: شهر واحد، 3 أسابيع، إلخ"
                    dir="rtl"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="flex-1 py-3.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {createMutation.isPending ? "جاري الحفظ..." : "حفظ المبادرة"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3.5 rounded-lg bg-muted text-foreground font-bold hover:bg-muted/80 transition-all duration-200"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Initiatives List */}
          {initiativesQuery.isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground mt-4">جاري التحميل...</p>
            </div>
          ) : initiativesQuery.data && initiativesQuery.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initiativesQuery.data.map((initiative, i) => (
                <motion.div
                  key={initiative.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-xl p-6 border border-border/50 hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-primary" />
                    </div>
                    <button
                      onClick={() => deleteMutation.mutate(initiative.id)}
                      disabled={deleteMutation.isPending}
                      className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                      title="حذف المبادرة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3">{initiative.name}</h3>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">الفئة المستهدفة</p>
                      <p className="text-sm text-foreground">{initiative.targetCategory}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">الهدف</p>
                      <p className="text-sm text-foreground line-clamp-2">{initiative.goal}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">الفترة الزمنية</p>
                      <p className="text-sm text-foreground">{initiative.timePeriod}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-muted/20 rounded-xl border border-border/50"
            >
              <Lightbulb className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-6">لم تتم إضافة أي مبادرات بعد</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                أضف مبادرتك الآن
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}

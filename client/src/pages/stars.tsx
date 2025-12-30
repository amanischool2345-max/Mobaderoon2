import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, User, Upload, Star } from "lucide-react";
import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface StarInitiative {
  id: number;
  name: string;
  grade: string;
  imageUrl: string;
}

export default function FeaturedStars() {
  const [showForm, setShowForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    imageUrl: "",
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const starsQuery = useQuery({
    queryKey: ["/api/stars"],
    queryFn: async () => {
      const res = await fetch("/api/stars");
      if (!res.ok) throw new Error("Failed to fetch stars");
      return res.json() as Promise<StarInitiative[]>;
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setFormData(prev => ({ ...prev, imageUrl: url }));
      toast({ title: "تم رفع الصورة بنجاح" });
    } catch (err) {
      toast({ variant: "destructive", title: "فشل رفع الصورة" });
    } finally {
      setIsUploading(false);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/stars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create star");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stars"] });
      toast({ title: "تمت إضافة المبادرة المميزة" });
      setFormData({ name: "", grade: "", imageUrl: "" });
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/stars/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stars"] });
      toast({ title: "تم الحذف بنجاح" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      toast({ variant: "destructive", title: "يرجى رفع صورة الطالبة" });
      return;
    }
    createMutation.mutate(formData);
  };

  return (
    <Layout>
      <section className="relative pt-20 pb-12 bg-gradient-to-b from-amber-50 to-transparent dark:from-amber-950/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 flex items-center justify-center gap-4">
              <Star className="w-12 h-12 text-amber-500 fill-amber-500" />
              مبادرون مميزون
              <Star className="w-12 h-12 text-amber-500 fill-amber-500" />
            </h1>
            <p className="text-xl text-muted-foreground">تكريم طالباتنا المبدعات صاحبات المبادرات النوعية</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white font-bold shadow-lg hover:bg-amber-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              إضافة نجمة مبادرة
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card border rounded-2xl p-8 mb-12 overflow-hidden"
              >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">اسم الطالبة</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-lg border bg-background"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">الصف</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-lg border bg-background"
                        value={formData.grade}
                        onChange={e => setFormData({ ...formData, grade: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 bg-muted/30">
                    {formData.imageUrl ? (
                      <div className="relative w-32 h-32 mb-4">
                        <img src={formData.imageUrl} className="w-full h-full object-cover rounded-full border-4 border-amber-500" />
                        <button 
                          type="button" 
                          onClick={() => setFormData({...formData, imageUrl: ""})}
                          className="absolute -top-2 -right-2 bg-destructive text-white p-1 rounded-full"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-4">صورة الطالبة المبادرة</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-4 py-2 bg-background border rounded-lg hover:bg-muted transition-colors"
                    >
                      {isUploading ? "جاري الرفع..." : "اختر صورة"}
                    </button>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={createMutation.isPending}
                      className="w-full py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-all"
                    >
                      حفظ التكريم
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {starsQuery.isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {starsQuery.data?.map((star, i) => (
                <motion.div
                  key={star.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-amber-100 dark:border-amber-900/30 shadow-xl group-hover:border-amber-500 transition-all duration-500">
                    <img src={star.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{star.name}</h3>
                      <p className="text-amber-200 text-sm">{star.grade}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-bold text-lg group-hover:text-amber-600 transition-colors">{star.name}</h3>
                    <p className="text-muted-foreground text-sm">{star.grade}</p>
                  </div>
                  <button
                    onClick={() => deleteMutation.mutate(star.id)}
                    className="absolute -top-2 -right-2 bg-destructive text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

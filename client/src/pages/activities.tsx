import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Plus, Trash2, Video, Play, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

interface Initiative {
  id: number;
  name: string;
  targetCategory: string;
  goal: string;
  timePeriod: string;
  videoUrl?: string;
  videoStoragePath?: string;
  createdAt?: Date;
}

export default function Activities() {
  const [showForm, setShowForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    targetCategory: "",
    goal: "",
    timePeriod: "",
    videoUrl: "",
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setFormData(prev => ({ ...prev, videoUrl: url }));
      
      // Auto-submit or enable save button is already handled by the state update
      toast({
        title: "تم رفع الفيديو",
        description: "تم رفع الملف بنجاح، يمكنك الآن الضغط على حفظ المبادرة",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "خطأ في الرفع",
        description: "فشل رفع الملف إلى الخادم",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch(api.initiatives.create.path, {
        method: api.initiatives.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create video initiative");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.initiatives.list.path] });
      toast({
        title: "تم إضافة الفيديو بنجاح",
        description: "تمت إضافة مبادرتك المرئية الجديدة",
      });
      setFormData({ name: "", targetCategory: "", goal: "", timePeriod: "", videoUrl: "" });
      setShowForm(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في إضافة الفيديو",
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
        title: "تم الحذف",
        description: "تم حذف المبادرة بنجاح",
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

  // Helper to get YouTube embed URL or similar if needed
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    // If it's a direct link to a file, we might want to use a <video> tag instead
    if (url.startsWith('/api/storage/') || url.match(/\.(mp4|webm|ogg)$/i)) {
      return null; // Return null to trigger <video> tag
    }
    return url;
  };

  return (
    <Layout>
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-6">
              معرض الفيديوهات
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              وثق مبادراتك الإبداعية من خلال الفيديو وشاركها مع المجتمع
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              إضافة فيديو المبادرة
            </button>
          </motion.div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50 mb-12"
            >
              <h2 className="text-2xl font-bold font-display text-foreground mb-6">إضافة فيديو جديد</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">اسم المبادرة</label>
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
                  <label className="block text-sm font-medium text-foreground/80 mb-2">الفئة المستهدفة</label>
                  <select
                    name="targetCategory"
                    value={formData.targetCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    dir="rtl"
                  >
                    <option value="">اختر الفئة المستهدفة</option>
                    <option value="ابتدائي">ابتدائي</option>
                    <option value="اساسي">اساسي</option>
                    <option value="ثانوي">ثانوي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">رابط الفيديو أو الرفع من الجهاز</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        placeholder="رابط (YouTube/Drive) أو سيظهر رابط الملف المرفوع هنا"
                        dir="ltr"
                      />
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className={`px-4 py-3 rounded-lg border border-dashed transition-all flex items-center justify-center gap-2 min-w-[140px] ${
                          formData.videoUrl && !formData.videoUrl.includes('youtube') && !formData.videoUrl.includes('drive')
                            ? 'border-primary text-primary bg-primary/5'
                            : 'border-border text-muted-foreground hover:text-primary hover:border-primary'
                        }`}
                      >
                        {isUploading ? (
                          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        {isUploading ? "جاري الرفع..." : "رفع من الجهاز"}
                      </button>
                    </div>
                    {formData.videoUrl && !formData.videoUrl.includes('youtube') && !formData.videoUrl.includes('drive') && (
                      <span className="text-xs text-primary">تم رفع الفيديو بنجاح ✓</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">وصف مختصر</label>
                  <textarea
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    placeholder="وصف للفيديو والمبادرة..."
                    dir="rtl"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={createMutation.isPending || isUploading}
                    className="flex-1 py-3.5 rounded-lg bg-primary text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
                  >
                    {createMutation.isPending ? "جاري الحفظ..." : "حفظ المبادرة"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3.5 rounded-lg bg-muted text-foreground font-bold hover:bg-muted/80 transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {initiativesQuery.isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
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
                  className="bg-background rounded-xl overflow-hidden border border-border/50 hover:border-primary/20 transition-all group shadow-sm"
                >
                  <div className="aspect-video bg-muted relative flex items-center justify-center overflow-hidden">
                    {initiative.videoUrl ? (
                      getEmbedUrl(initiative.videoUrl) ? (
                        <iframe
                          src={getEmbedUrl(initiative.videoUrl) || ''}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      ) : (
                        <video 
                          src={initiative.videoUrl} 
                          controls 
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <Video className="w-12 h-12 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-foreground">{initiative.name}</h3>
                      <button
                        onClick={() => deleteMutation.mutate(initiative.id)}
                        className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{initiative.goal}</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-primary">
                      <span className="px-2 py-1 rounded bg-primary/10">{initiative.targetCategory}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed border-border">
              <Video className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">لا يوجد فيديوهات مبادرات بعد</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

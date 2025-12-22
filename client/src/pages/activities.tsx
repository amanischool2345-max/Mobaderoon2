import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

interface Discussion {
  id: number;
  name: string;
  message: string;
  createdAt?: Date;
}

export default function Activities() {
  const [newMessage, setNewMessage] = useState("");
  const [newName, setNewName] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const discussionsQuery = useQuery({
    queryKey: ["discussions"],
    queryFn: async () => {
      const res = await fetch("/api/discussions", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch discussions");
      return res.json() as Promise<Discussion[]>;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { name: string; message: string }) => {
      const res = await fetch("/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create discussion");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "شكراً لمشاركتك في النقاش",
      });
      setNewMessage("");
      setNewName("");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في إرسال الرسالة",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newMessage.trim()) {
      createMutation.mutate({ name: newName, message: newMessage });
    }
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
              مساحة حرة لطرح الأفكار ومناقشتها وتطويرها مع الآخرين
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* New Discussion Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50 mb-12"
          >
            <h2 className="text-2xl font-bold font-display text-foreground mb-6">شارك فكرتك</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  اسمك
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="ادخل اسمك"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  الفكرة أو التعليق
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  placeholder="شارك فكرتك أو تعليقك..."
                  dir="rtl"
                />
              </div>

              <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {createMutation.isPending ? "جاري الإرسال..." : "إرسال"}
              </button>
            </form>
          </motion.div>

          {/* Discussions List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground mb-6">النقاشات والأفكار</h2>
            
            {discussionsQuery.isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground mt-4">جاري التحميل...</p>
              </div>
            ) : discussionsQuery.data && discussionsQuery.data.length > 0 ? (
              <div className="space-y-4">
                {discussionsQuery.data.map((discussion, i) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background rounded-xl p-6 border border-border/50 hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground">{discussion.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {discussion.createdAt && new Date(discussion.createdAt).toLocaleDateString('ar-SA')}
                        </p>
                        <p className="text-foreground mt-3 leading-relaxed break-words" dir="rtl">{discussion.message}</p>
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
                <MessageCircle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-6">لم يتم إضافة أي نقاشات بعد</p>
                <p className="text-muted-foreground text-sm">كن أول من يشارك فكرته!</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

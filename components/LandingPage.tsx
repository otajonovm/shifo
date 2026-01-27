
import React, { useState, useRef, useEffect } from 'react';
import { 
  Activity, Users, Calendar, CreditCard, Box, BarChart3, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Globe, Stethoscope, TrendingUp,
  Award, MousePointer2, PlayCircle, Sparkles, MessageSquare, X, Send, BookOpen,
  AlertTriangle, ShieldAlert, Timer, Target, BadgeCheck, Lightbulb
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface LandingPageProps {
  onNavigateToGuide: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToGuide }) => {
  // AI Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoStatus, setDemoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [demoError, setDemoError] = useState('');
  const [demoForm, setDemoForm] = useState({
    clinicName: '',
    fullName: '',
    phone: '',
    message: '',
  });

  const TELEGRAM_BOT_TOKEN = '8537318966:AAFImCxi9M_vjhjKmWvy0jXaVYm_Fvn_L_U';
  const TELEGRAM_CHAT_ID = '7736700647';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const handleSendMessage = async (customMsg?: string) => {
    const msgToSend = customMsg || input;
    if (!msgToSend.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: msgToSend }]);
    setInput('');
    setIsTyping(true);
    setChatOpen(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: msgToSend,
        config: {
          systemInstruction: `Siz ShifoCRM tizimining professional sotuvchi va texnik konsultantisiz. 
          Klinika egalari va shifokorlarga tizimning afzalliklarini tushuntiring.
          Asosiy urg'u: Moliya nazorati, foyda o'sishi, odontogramma qulayligi va ish jarayonini 100% raqamlashtirish.
          Javoblarni o'zbek tilida, qisqa va ishonarli bering.`
        }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'Xatolik yuz berdi.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Hozircha javob bera olmayman, iltimos keyinroq urinib ko'ring." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleDemoSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!demoForm.clinicName || !demoForm.phone) return;

    setDemoSubmitting(true);
    setDemoStatus('idle');
    setDemoError('');
    
    const payload = [
      '📩 Demo soʻrovi (ShifoCRM)',
      `🏥 Klinika: ${demoForm.clinicName}`,
      `👤 Kontakt: ${demoForm.fullName || '—'}`,
      `📞 Telefon: ${demoForm.phone}`,
      `💬 Xabar: ${demoForm.message || '—'}`,
    ].join('\n');

    try {
      // chat_id ni string sifatida yuborish kerak
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: String(TELEGRAM_CHAT_ID), // String ga o'tkazish
          text: payload,
          parse_mode: 'HTML', // HTML formatni qo'llab-quvvatlash
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Telegram API dan kelgan aniq xato xabarni ko'rsatish
        const errorMsg = data.description || data.error_code 
          ? `Xatolik ${data.error_code}: ${data.description}` 
          : 'Telegram ga yuborishda xatolik yuz berdi';
        throw new Error(errorMsg);
      }

      setDemoStatus('success');
      setDemoForm({ clinicName: '', fullName: '', phone: '', message: '' });
      setTimeout(() => {
        setDemoOpen(false);
        setDemoStatus('idle');
      }, 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Telegram send failed';
      setDemoError(message);
      setDemoStatus('error');
      console.error('Telegram API Error:', error);
    } finally {
      setDemoSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative selection:bg-shifo-primary selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-[60] glass-effect border-b border-shifo-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-shifo-primary p-2 rounded-xl group-hover:rotate-6 transition-transform">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-extrabold text-slate-900 tracking-tight leading-none">SHIFO<span className="text-shifo-primary">CRM</span></span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-[0.25em]">Smart Dental Solution</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-10">
            <a href="#problem" className="text-sm font-semibold tracking-wide text-slate-600 hover:text-shifo-primary transition-colors">Muammolar</a>
            <a href="#solution" className="text-sm font-semibold tracking-wide text-slate-600 hover:text-shifo-primary transition-colors">Yechimlar</a>
            <a href="#ai-section" className="text-sm font-semibold tracking-wide text-slate-600 hover:text-shifo-primary transition-colors">AI Yordamchi</a>
            <button onClick={onNavigateToGuide} className="text-sm font-semibold tracking-wide text-slate-600 hover:text-shifo-primary transition-colors flex items-center">
              Qo'llanma <BookOpen className="ml-1.5 h-4 w-4 opacity-50" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
             <button onClick={() => window.open('https://shifocrm.vercel.app/login', '_blank')} className="hidden sm:block text-sm font-semibold text-shifo-primary hover:text-shifo-dark transition-colors">Kirish</button>
             <button onClick={() => setDemoOpen(true)} className="bg-shifo-primary text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-shifo-accent transition-all hover:-translate-y-0.5">Demo Olish</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 lg:pt-24 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-shifo-light/50 to-transparent -z-10 rounded-l-[300px] translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center py-2 px-5 rounded-full bg-shifo-light text-shifo-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-8 border border-shifo-primary/10">
                <BadgeCheck className="h-4 w-4 mr-2" /> Klinikalarni raqamlashtirish bo'yicha №1 tanlov
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-[-0.03em] mb-8 leading-[1.05]">
                Sizning klinikangiz <span className="bg-gradient-to-r from-shifo-primary to-shifo-accent text-transparent bg-clip-text">aqlli</span> boshqaruvga loyiq
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed font-normal">
                Qog'ozbozlik, moliya noaniqligi va bemorlarni yo'qotishni to'xtating. ShifoCRM bilan 100% nazorat va o'sishga erishing.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start">
                <button onClick={() => setDemoOpen(true)} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 flex items-center justify-center group">
                  Bepul Demo <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={onNavigateToGuide} className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-semibold text-lg hover:border-shifo-primary hover:text-shifo-primary transition-all flex items-center justify-center">
                  O'rganish <PlayCircle className="ml-2 h-6 w-6 opacity-60" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 mt-20 lg:mt-0 relative animate-fade-in">
              <div className="relative z-10 bg-white p-4 rounded-[50px] border border-slate-100 transform rotate-3 hover:rotate-0 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" className="rounded-[40px] w-full h-[600px] object-cover" alt="Clinic Management" />
                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl border border-slate-100 animate-float">
                  <p className="text-4xl font-black text-shifo-primary leading-none">+30%</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Foyda o'sishi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Problem Section - Loss Aversion */}
      <section id="problem" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold text-slate-900 mb-6 tracking-[-0.02em]">CRM ishlatmaslik orqali <span className="text-red-500">nimalarni yoqotyapsiz?</span></h2>
              <p className="text-lg text-slate-600">Ko'p klinika egalari tizimsizlik tufayli har oy millionlab so'm foydani qo'ldan boy berishadi.</p>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center space-x-4">
              <AlertTriangle className="h-10 w-10 text-red-500 animate-pulse" />
              <p className="text-red-900 font-semibold text-lg">Bu muammolar sizga tanishmi?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LossCard icon={<ShieldAlert className="text-red-500" />} title="Moliya Sizib Chiqishi" desc="Bemorlar qarzlari va xizmatlar hisobi aniq emasligi sababli moliya yo'qolishi." />
            <LossCard icon={<Timer className="text-red-500" />} title="Vaqt Yo'qotish" desc="Bemorlarni ro'yxatga olish va hisobotlarni qog'ozda yuritishdagi xatolar." />
            <LossCard icon={<Target className="text-red-500" />} title="Nazorat Yo'qligi" desc="Materiallar ombori va vrachlar ish unumdorligini real vaqtda ko'rib bo'lmasligi." />
            <LossCard icon={<Users className="text-red-500" />} title="Bemorlar Qochishi" desc="Uchrashuvlarni vaqtida eslatmaslik va servis sifati pastligi sabab bemorlar yo'qolishi." />
          </div>
        </div>
      </section>

      {/* Solution Section - What we give */}
      <section id="solution" className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold text-slate-900 mb-6 tracking-[-0.02em]">Biz sizga <span className="text-shifo-primary">yechim</span> beramiz</h2>
            <p className="text-lg text-slate-600">ShifoCRM klinikangizni soat kabi aniq ishlashini ta'minlaydi.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SolutionItem title="Moliya va Qarzdorlik Nazorati" desc="Har bir to'lovni (Naqd, Plastik, O'tkazma) va qarzdor bemorlarni avtomatik kuzatib boring." />
            <SolutionItem title="Interaktiv Odontogramma" desc="Bemorlar uchun tish xaritasini raqamli yarating va davolash rejalarini vizual ko'rsating." />
            <SolutionItem title="Kengaytirilgan Hisobotlar" desc="Kunlik, haftalik va oylik foyda, xarajat hamda vrachlar statistikasi qo'lingizda bo'ladi." />
            <SolutionItem title="Avtomatlashtirilgan Ombor" desc="Materiallar qoldig'ini nazorat qiling, kirim-chiqimni bir marta bosish bilan bajaring." />
          </div>
        </div>
      </section>

      {/* Dynamic AI Section */}
      <section id="ai-section" className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-shifo-primary/10 blur-[150px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-2xl rounded-[60px] p-12 lg:p-24 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center py-2 px-5 rounded-full bg-shifo-primary/20 text-shifo-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-8 border border-shifo-primary/30">
                  <Sparkles className="h-4 w-4 mr-2" /> Kelajak Texnologiyasi
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold text-white mb-6 tracking-[-0.02em]">Istalgan savolingizga <span className="text-shifo-primary">AI orqali</span> javob oling</h2>
                <p className="text-lg text-slate-300 mb-10 leading-relaxed">Shifo-AI sizga tizimning imkoniyatlari, foyda keltirishi va texnik jihatlari bo'yicha darhol yordam beradi.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <QuickQuestionBtn onClick={() => handleSendMessage("Moliya nazorati qanday ishlaydi?")} text="Moliya nazorati?" />
                  <QuickQuestionBtn onClick={() => handleSendMessage("Foydani qanday oshiradi?")} text="Foyda o'sishi?" />
                  <QuickQuestionBtn onClick={() => handleSendMessage("Odontogramma bormi?")} text="Odontogramma?" />
                  <QuickQuestionBtn onClick={() => handleSendMessage("Hisobotlar qanday?")} text="Hisobotlar?" />
                </div>
              </div>

              <div className="bg-white rounded-[40px] h-[500px] border border-white/10 flex flex-col overflow-hidden animate-slide-up">
                <div className="p-6 border-b border-slate-100 flex items-center space-x-4 bg-slate-50">
                  <div className="h-12 w-12 bg-shifo-primary rounded-2xl flex items-center justify-center text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 tracking-tight">Shifo-AI</p>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Hozir Online</p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar" ref={scrollRef}>
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                      <Lightbulb className="h-16 w-16 mb-4 text-slate-300" />
                      <p className="font-bold text-slate-400 px-10">Chapdagi tugmalardan birini bosing yoki o'zingiz savol yozing.</p>
                    </div>
                  )}
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-6 py-4 rounded-[22px] text-sm font-bold ${m.role === 'user' ? 'bg-shifo-primary text-white' : 'bg-slate-100 text-slate-700'}`}>{m.text}</div>
                    </div>
                  ))}
                  {isTyping && <div className="text-slate-400 text-xs font-bold animate-pulse">Shifo-AI javob bermoqda...</div>}
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  <div className="flex space-x-3">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder="Savol yozing..." className="flex-1 bg-white border border-slate-200 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-shifo-primary/20" />
                    <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="bg-shifo-primary text-white p-4 rounded-2xl hover:bg-shifo-accent transition-all disabled:opacity-50"><Send className="h-6 w-6" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Footer CTA */}
      <footer className="bg-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold mb-10 tracking-[-0.02em]">Klinikangizni raqamli kelajagi bugundan boshlanadi</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
            <button onClick={() => setDemoOpen(true)} className="bg-white text-shifo-primary px-12 py-6 rounded-3xl font-semibold text-xl hover:bg-shifo-light transition-all hover:-translate-y-2">Demo Buyurtma Berish</button>
            {/* Fix: Wrapped handleSendMessage in an anonymous function to avoid type mismatch with MouseEvent */}
            <button onClick={() => handleSendMessage()} className="text-white font-semibold text-lg hover:text-shifo-primary transition-colors flex items-center group">Tizim Haqida Savol Berish <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" /></button>
          </div>
          <div className="mt-24 pt-12 border-t border-white/5 text-slate-600 font-bold text-sm tracking-widest uppercase">
            © 2025 ShifoCRM - Raqamli Stomatologiya Kelajagi
          </div>
        </div>
      </footer>

      {/* Demo Form Modal */}
      {demoOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 px-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Demo soʻrovi</p>
                <h3 className="text-2xl font-display font-bold text-slate-900">ShifoCRM bilan bogʻlaning</h3>
              </div>
              <button onClick={() => setDemoOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 transition">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleDemoSubmit} className="p-6 space-y-4">
              <label className="block text-sm font-semibold text-slate-700">
                Klinikangiz nomi *
                <input
                  value={demoForm.clinicName}
                  onChange={(e) => setDemoForm((prev) => ({ ...prev, clinicName: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shifo-primary/40"
                  placeholder="Masalan: City Dental"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Ism-sharif
                <input
                  value={demoForm.fullName}
                  onChange={(e) => setDemoForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shifo-primary/40"
                  placeholder="F.I.O"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Telefon *
                <input
                  value={demoForm.phone}
                  onChange={(e) => setDemoForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shifo-primary/40"
                  placeholder="+998 __ ___ __ __"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Xabar
                <textarea
                  value={demoForm.message}
                  onChange={(e) => setDemoForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shifo-primary/40"
                  rows={3}
                  placeholder="Qisqa izoh..."
                />
              </label>
              {demoStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-800 font-semibold">✅ So'rov muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.</p>
                </div>
              )}
              {demoStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-800 font-semibold">❌ Xatolik: {demoError || 'Token va Chat ID ni tekshiring.'}</p>
                  <p className="text-xs text-red-600 mt-2">Iltimos, botga /start yozganingizni va Chat ID to'g'riligini tekshiring.</p>
                </div>
              )}
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={() => setDemoOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={demoSubmitting || demoStatus === 'success'}
                  className="px-6 py-3 rounded-xl bg-shifo-primary text-white font-semibold text-sm hover:bg-shifo-accent transition disabled:opacity-60"
                >
                  {demoSubmitting ? 'Yuborilmoqda...' : demoStatus === 'success' ? 'Yuborildi ✓' : 'So‘rov yuborish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Chat Trigger - Sidebar AI stays consistent */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} className="fixed bottom-10 right-10 h-20 w-20 shifo-gradient rounded-[30px] flex items-center justify-center text-white border border-white/30 hover:scale-110 active:scale-95 transition-all z-[99] animate-float">
          <Sparkles className="h-10 w-10" />
          <span className="absolute -top-1 -right-1 h-6 w-6 bg-emerald-500 border-4 border-white rounded-full"></span>
        </button>
      )}

      {/* Mobile Sidebar Trigger (Consistent with AI overlay from previous versions) */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 lg:right-10 w-[95%] sm:w-[450px] h-[600px] bg-white rounded-[40px] z-[100] border border-slate-200 flex flex-col animate-slide-up overflow-hidden">
           {/* Re-using same chat UI for consistency */}
           <div className="shifo-gradient p-8 text-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                 <Sparkles className="h-6 w-6" />
                 <div>
                    <p className="font-black text-xl tracking-tight">Shifo-AI</p>
                    <p className="text-[10px] opacity-80 uppercase font-black tracking-widest">Assistant</p>
                 </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors"><X className="h-7 w-7" /></button>
           </div>
           <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-[20px] text-sm font-bold ${m.role === 'user' ? 'bg-shifo-primary text-white' : 'bg-white text-slate-700'}`}>{m.text}</div>
                </div>
              ))}
              {isTyping && <div className="text-slate-400 text-xs font-bold animate-pulse px-4">Yozmoqda...</div>}
           </div>
           <div className="p-6 bg-white border-t border-slate-100">
              <div className="flex space-x-2">
                 <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder="Xabar..." className="flex-1 bg-slate-100 border border-slate-200 rounded-xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-shifo-primary/20" />
                 <button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping} className="bg-shifo-primary text-white p-4 rounded-xl hover:bg-shifo-accent transition-all disabled:opacity-50"><Send className="h-6 w-6" /></button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const LossCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-10 rounded-[35px] border border-slate-100 hover:border-red-100 transition-all group hover:-translate-y-2">
    <div className="h-16 w-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-display font-bold text-slate-900 mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const SolutionItem: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="bg-white p-10 rounded-[40px] border border-slate-100 hover:border-shifo-primary/20 transition-all flex items-start space-x-8 group">
    <div className="h-14 w-14 bg-shifo-light rounded-2xl flex items-center justify-center shrink-0 text-shifo-primary group-hover:bg-shifo-primary group-hover:text-white transition-all">
      <CheckCircle2 className="h-8 w-8" />
    </div>
    <div>
      <h3 className="text-2xl font-display font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-600 text-lg leading-relaxed">{desc}</p>
    </div>
  </div>
);

const QuickQuestionBtn: React.FC<{ onClick: () => void; text: string }> = ({ onClick, text }) => (
  <button onClick={onClick} className="bg-white/10 hover:bg-white/20 border border-white/10 py-4 px-6 rounded-2xl text-white font-semibold text-sm tracking-tight text-left flex items-center justify-between group transition-all">
    {text} <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-shifo-primary" />
  </button>
);

import { ChevronRight } from 'lucide-react';

export default LandingPage;

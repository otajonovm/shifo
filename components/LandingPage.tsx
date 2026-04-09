
import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BookOpen,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cloud,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Stethoscope,
  Users,
  Wallet,
  ClipboardPlus,
  Send,
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToGuide: () => void;
}

const moduleCards: { title: string; description: string; icon: React.ElementType }[] = [
  {
    title: 'Qabul (Appointments)',
    description: "Shifokor kesimida bo'sh vaqtlarni ko'ring, tez bron qiling.",
    icon: CalendarCheck2,
  },
  {
    title: 'Bemorlar (Patients)',
    description: "Kontakt, tashxis, tashriflar va davolash tarixini jamlang.",
    icon: Users,
  },
  {
    title: 'Lidlar (Leads)',
    description: "Telegram/public sahifadan kelgan so'rovlarni yo'qotmang.",
    icon: Megaphone,
  },
  {
    title: 'Tashriflar (Visits)',
    description: "Har qabul bo'yicha xizmatlar, status va izohlar.",
    icon: ClipboardPlus,
  },
  {
    title: "To'lovlar (Payments)",
    description: "Kassa oqimi, to'langan/to'lanmagan holatlar.",
    icon: Wallet,
  },
  {
    title: 'Ombor (Inventory)',
    description: "Material kirim-chiqimi va sarf nazorati.",
    icon: Package,
  },
  {
    title: 'Hisobotlar (Reports)',
    description: "Kunlik/oylik tushum va samaradorlik ko'rsatkichlari.",
    icon: BarChart3,
  },
];

const faqItems = [
  {
    q: "Ma'lumotlar xavfsizmi?",
    a: "Ha, rolga asoslangan kirish va himoyalangan infratuzilma qo'llanadi.",
  },
  {
    q: 'Migratsiya qiyinmi?',
    a: "Yo'q, boshlang'ich sozlash va import bo'yicha yordam beriladi.",
  },
  {
    q: 'Mobil telefonda ishlaydimi?',
    a: "Ha, mobilga mos interfeýs bilan ishlaydi.",
  },
  {
    q: 'Telegram bilan ishlaydimi?',
    a: 'Ha, lead va xabarnoma jarayonlari bilan integratsiya bor.',
  },
  {
    q: "Ko'p filialni qo'llaydimi?",
    a: "Ha, klinika/filiallar bo'yicha boshqaruv mumkin.",
  },
  {
    q: 'Jamoa rollarini boshqarish bormi?',
    a: "Ha, administrator, shifokor va qabul xodimlari uchun alohida ruxsatlar beriladi.",
  },
  {
    q: 'Hisobotlarni eksport qilish mumkinmi?',
    a: "Ha, asosiy moliyaviy va operatsion hisobotlarni ko'rish hamda ulashish mumkin.",
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToGuide }) => {
  const logoSrc = '/img/shifocrm_logo.png';
  const TELEGRAM_BOT_TOKEN = '8537318966:AAFImCxi9M_vjhjKmWvy0jXaVYm_Fvn_L_U';
  const TELEGRAM_CHAT_ID = '7736700647';

  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoStatus, setDemoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [demoError, setDemoError] = useState('');
  const [demoForm, setDemoForm] = useState({
    clinicName: '',
    fullName: '',
    phone: '',
    message: '',
  });

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
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: String(TELEGRAM_CHAT_ID),
          text: payload,
          parse_mode: 'HTML',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data?.description || data?.error_code
          ? `Xatolik ${data?.error_code}: ${data?.description}`
          : 'Telegram ga yuborishda xatolik yuz berdi';
        throw new Error(errorMsg);
      }

      setDemoStatus('success');
      setDemoForm({ clinicName: '', fullName: '', phone: '', message: '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Telegram send failed';
      setDemoError(message);
      setDemoStatus('error');
    } finally {
      setDemoSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-shifo-primary selection:text-white pb-24 md:pb-0">
      <nav className="sticky top-0 z-50 glass-effect border-b border-shifo-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <img src={logoSrc} alt="ShifoCRM logo" className="h-11 w-11 object-contain" />
            <div>
              <p className="text-xl font-display font-extrabold text-slate-900 leading-none">
                SHIFO<span className="text-shifo-primary">CRM</span>
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-semibold">Klinikalar uchun CRM</p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#problem" className="hover:text-shifo-primary transition-colors">Muammo</a>
            <a href="#solution" className="hover:text-shifo-primary transition-colors">Yechim</a>
            <a href="#modules" className="hover:text-shifo-primary transition-colors">Modullar</a>
            <a href="#faq" className="hover:text-shifo-primary transition-colors">FAQ</a>
            <button onClick={onNavigateToGuide} className="hover:text-shifo-primary transition-colors inline-flex items-center gap-1">
              Qo'llanma <BookOpen className="h-4 w-4" />
            </button>
          </div>

          <a href="#demo-form" className="bg-shifo-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-shifo-accent transition-colors">
            Bepul demo so'rash
          </a>
        </div>
      </nav>

      <header id="hero" className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24 bg-gradient-to-b from-shifo-light/50 to-white">
        <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-shifo-primary/15 blur-3xl animate-float-slow" />
        <div className="absolute top-16 -right-16 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl animate-float-slow" style={{ animationDelay: '1.2s' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-slide-up">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase bg-white border border-shifo-border rounded-full px-4 py-2 mb-6 text-shifo-primary">
              <ShieldCheck className="h-4 w-4" /> ShifoCRM
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 leading-tight tracking-tight">
              Klinikangiz boshqaruvi — <span className="text-shifo-primary">bitta tizimda</span>
            </h1>
            <p className="mt-4 text-2xl font-bold text-shifo-primary">Sotuvga yo‘naltirilgan CRM tajribasi</p>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
              ShifoCRM bilan qabul yozuvi, bemor tarixi, to'lovlar, ombor va hisobotlarni real vaqtda boshqaring.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href="#demo-form" className="bg-slate-900 text-white px-7 py-4 rounded-2xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                Bepul demo so'rash <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#demo-form" className="bg-white border-2 border-slate-200 text-slate-900 px-7 py-4 rounded-2xl font-semibold inline-flex items-center justify-center hover:border-shifo-primary hover:text-shifo-primary transition-colors">
                7 kun sinab ko'rish
              </a>
            </div>
            <p className="mt-7 text-sm text-slate-500">
              Ma'lumotlar xavfsiz saqlanadi • Ko'p filialni qo'llaydi • Mobilga mos
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm animate-fade-in">
            <img src={logoSrc} alt="ShifoCRM" className="h-24 w-24 object-contain mx-auto" />
            <p className="mt-6 text-center text-slate-900 font-display font-bold text-2xl">ShifoCRM</p>
            <p className="text-center text-slate-600 mt-3 leading-relaxed">
              Stomatologiya va klinikalar uchun qabul, bemor, moliya va omborni bir joyda boshqaradigan CRM.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-8 text-center">
              <div className="rounded-xl bg-shifo-light p-3">
                <p className="font-black text-shifo-primary text-xl">30–50%</p>
                <p className="text-xs text-slate-500">Vaqt tejaladi</p>
              </div>
              <div className="rounded-xl bg-shifo-light p-3">
                <p className="font-black text-shifo-primary text-xl">↓</p>
                <p className="text-xs text-slate-500">No-show kamayadi</p>
              </div>
              <div className="rounded-xl bg-shifo-light p-3">
                <p className="font-black text-shifo-primary text-xl">24/7</p>
                <p className="text-xs text-slate-500">Nazorat</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 p-4 bg-slate-50">
              <p className="text-sm font-semibold text-slate-700">Jarayon to‘liq boshqaruvda</p>
              <p className="text-sm text-slate-500 mt-1">Lead → Qabul → Tashrif → To‘lov → Hisobot</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-shifo-primary to-cyan-400 animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="border-y border-slate-200 bg-slate-50/70 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-shifo-primary" /> Sotuvchi landing struktura</span>
            <span className="inline-flex items-center gap-2"><BellRing className="h-4 w-4 text-shifo-primary" /> Demo so‘rovi Telegramga tushadi</span>
            <span className="inline-flex items-center gap-2"><Stethoscope className="h-4 w-4 text-shifo-primary" /> Stomatologiya va klinikalarga mos</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-shifo-primary" /> Ko‘p filial va xavfsiz boshqaruv</span>
          </div>
        </div>
      </section>

      <section id="problem" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">Klinikada vaqtni eng ko'p nima oladi?</h2>
          <p className="mt-4 text-lg text-slate-600">Qo'lda boshqaruv sabab o'sish sekinlashadi va xatoliklar ko'payadi.</p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Qo'lda jadval yuritish",
              "Bemorlar tarixini topish qiyin",
              "No-show ko'p",
              'Hisobotlar kechikadi',
              'Ombor nazorati sust',
              "Qabul xodimining ortiqcha yuklanishi",
            ].map((item) => (
              <div key={item} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-3 hover:-translate-y-1 transition-all animate-fade-in">
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-red-500" />
                <p className="font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">ShifoCRM bilan jarayonlar avtomatlashtiriladi</h2>
          <div className="mt-10 grid lg:grid-cols-2 gap-5">
            {[
              'Qabul jadvali',
              'Avto eslatmalar',
              "Lead'dan qabulgacha kuzatuv",
              "To'lov va qarzdorlik nazorati",
              'Ombor sarfi hisobi',
            ].map((item) => (
              <div key={item} className="bg-shifo-light rounded-2xl border border-shifo-border p-6 flex items-center gap-3 hover:shadow-sm transition-all animate-slide-up">
                <CheckCircle2 className="h-5 w-5 text-shifo-primary" />
                <p className="font-semibold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modules" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">Asosiy modullar</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moduleCards.map((module) => {
              const Icon = module.icon;
              return (
                <article key={module.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-shifo-primary/40 hover:-translate-y-1 transition-all">
                  <div className="h-11 w-11 rounded-xl bg-shifo-light flex items-center justify-center text-shifo-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900">{module.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{module.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="results" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">Natijalar</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 p-6 bg-white hover:-translate-y-1 transition-all">
              <Clock3 className="h-8 w-8 text-shifo-primary" />
              <p className="mt-4 font-semibold text-slate-900">Qabulni boshqarishga ketadigan vaqtni 30–50% gacha qisqartiradi.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6 bg-white hover:-translate-y-1 transition-all">
              <MessageCircle className="h-8 w-8 text-shifo-primary" />
              <p className="mt-4 font-semibold text-slate-900">No-show holatlarini eslatmalar orqali kamaytiradi.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6 bg-white hover:-translate-y-1 transition-all">
              <Building2 className="h-8 w-8 text-shifo-primary" />
              <p className="mt-4 font-semibold text-slate-900">Moliya va ombor bo'yicha shaffof nazorat beradi.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="integrations" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">Integratsiyalar</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <Send className="h-8 w-8 text-shifo-primary" />
              <h3 className="mt-4 font-bold text-slate-900">Telegram</h3>
              <p className="mt-2 text-slate-600">Leadlarni qabul qilish va xabarnoma yuborish jarayonlarini soddalashtiring.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <Phone className="h-8 w-8 text-shifo-primary" />
              <h3 className="mt-4 font-bold text-slate-900">WhatsApp / Telefon</h3>
              <p className="mt-2 text-slate-600">Qabul tasdiqlash, eslatma va tezkor aloqa uchun qulay ulanishlar.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <Cloud className="h-8 w-8 text-shifo-primary" />
              <h3 className="mt-4 font-bold text-slate-900">Supabase / Cloud</h3>
              <p className="mt-2 text-slate-600">Ma'lumotlar bulutda xavfsiz saqlanadi va filiallar bo'yicha boshqariladi.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">FAQ</h2>
          <div className="mt-10 space-y-4">
            {faqItems.map((item) => (
              <details key={item.q} className="group bg-white border border-slate-200 rounded-2xl p-6">
                <summary className="list-none cursor-pointer flex items-center justify-between gap-3 font-bold text-slate-900">
                  <span>Savol: {item.q}</span>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-2 text-slate-600">Javob: {item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="final-cta" className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-display font-extrabold tracking-tight">Qog'ozsiz ishlashga bugun o'ting</h2>
          <p className="mt-5 text-slate-300 text-lg">
            Qabulni tezlashtiring, xatolikni kamaytiring va qaytuvchi bemorlar sonini oshiring.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#demo-form" className="bg-white text-slate-900 px-7 py-4 rounded-2xl font-semibold hover:bg-slate-100 transition-colors">Bepul demo so'rash</a>
            <a href="#demo-form" className="border border-white/40 px-7 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-colors">7 kun sinab ko'rish</a>
          </div>

          <div id="demo-form" className="mt-10 max-w-2xl mx-auto bg-white text-slate-900 rounded-3xl border border-slate-200 p-6 sm:p-8 text-left">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Demo so'rovi</p>
            <h3 className="mt-2 text-2xl font-display font-bold">ShifoCRM demo uchun ma'lumot qoldiring</h3>
            <form onSubmit={handleDemoSubmit} className="mt-6 space-y-4">
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
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-sm text-green-800 font-semibold">✅ So'rov muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.</p>
                </div>
              )}

              {demoStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-sm text-red-800 font-semibold">❌ Xatolik: {demoError || 'Telegram sozlamalarini tekshiring.'}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={demoSubmitting}
                className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60"
              >
                {demoSubmitting ? 'Yuborilmoqda...' : 'So‘rov yuborish'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer id="contact" className="py-12 bg-slate-950 text-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <p className="font-display font-extrabold text-2xl text-white">ShifoCRM</p>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Asosiy va'da: qog'ozsiz ishlash, tezroq qabul, kamroq xatolik, ko'proq qaytuvchi bemor.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-white">Kontakt</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +998 XX XXX XX XX</p>
            <p className="flex items-center gap-2"><Send className="h-4 w-4" /> @your_username</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@domain.uz</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Shahar, ko'cha, mo'ljal</p>
            <p className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> Dush–Shan, 09:00–19:00</p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-white">Huquqiy sahifalar</p>
            <a href="#" className="block hover:text-white transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="block hover:text-white transition-colors">Foydalanish shartlari</a>
            <a href="#" className="block hover:text-white transition-colors">Ommaviy oferta</a>
            <p className="pt-2 text-slate-500 text-sm">© 2026 ShifoCRM. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 p-3">
        <div className="grid grid-cols-2 gap-2">
          <a href="#demo-form" className="bg-slate-900 text-white text-center py-3 rounded-xl font-semibold text-sm">Demo so'rash</a>
          <a href="tel:+998000000000" className="bg-shifo-light text-shifo-primary text-center py-3 rounded-xl font-semibold text-sm">Qo'ng'iroq qilish</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

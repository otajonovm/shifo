
import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BellRing,
  BookOpen,
  Check,
  Cloud,
  Database,
  Headphones,
  ArrowRightLeft,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  X,
} from 'lucide-react';

type Lang = 'uz' | 'ru';

interface LandingPageProps {
  onNavigateToGuide: () => void;
}

const translations = {
  uz: {
    nav: {
      features: 'Xususiyatlar',
      pricing: 'Tariflar',
      contact: 'Aloqa',
      cta: '7 kun bepul sinash',
    },
    hero: {
      badge: 'Stomatologiyalar uchun bulutli CRM',
      headline: "Bemorlarni 'bir martalik' qilmang — umrbod mijozga aylantiring!",
      subheadline:
        'ShifoCRM — stomatologiyalar uchun bemorlar bazasini xavfsiz saqlash va ularni avtomatik qabulga qaytarish tizimi.',
      cta: '7 kunlik BEPUL sinovni boshlash',
      subtext: 'Excel va daftarlardagi eski bemorlar bazangizni ham tizimga qo\'shib beramiz',
      trust: ['24/7 qo\'llab-quvvatlash', 'Eski bazani tizimga qo\'shamiz', 'SMS va Telegram eslatmalar'],
    },
    salesStrengths: {
      title: 'Klinikalarni ShifoCRM\'ga o\'tkazadigan eng kuchli argumentlar',
      items: [
        {
          title: '24/7 qo\'llab-quvvatlash',
          desc: 'Kun-u tun texnik yordam — muammo yuzaga kelsa, jamoamiz doim yoningizda.',
        },
        {
          title: 'Eski bazani tizimga qo\'shamiz',
          desc: 'Excel va daftarlardagi eski bemorlar bazangizni ham tizimga kiritib beramiz — siz hech narsa qilmaysiz.',
        },
      ],
    },
    problems: {
      title: 'Klinikangizda qaysi muammolar bor?',
      subtitle: 'Qog\'oz daftar va qo\'lda boshqaruv klinikangiz daromadini kamaytiradi.',
      cards: [
        {
          title: "Qog'oz daftarlardagi chalkashlik",
          desc: "Bemorlar bazasi daftarlarda tarqoq, kerakli odamni topish qiyin va ma'lumotlar yo'qolib ketish xavfi bor.",
        },
        {
          title: 'Bemorlar qabulga kelmay qolyaptimi?',
          desc: 'Administrator har bir bemorga eslatib chiqishga ulgurmaydi. Kreslolar bo\'sh qoladi, daromad yo\'qoladi.',
        },
        {
          title: "Ma'lumotlar bir joyda emas",
          desc: 'Rentgen suratlari, tish formulasi va tarix alohida-alohida saqlanadi. Shifokor vaqtini izlashga sarflaydi.',
        },
      ],
    },
    solution: {
      title: 'ShifoCRM yechimi',
      subtitle: 'Bemorlar bazasini xavfsiz saqlang va ularni avtomatik qabulga qaytaring.',
      blocks: [
        {
          title: 'Aqlli raqamli baza',
          subtitle: 'Smart Cloud Database',
          desc: "Bir umr yo'qolmaydigan xavfsiz bemorlar bazasi. Tashriflar tarixi, tish formulasi va rentgen rasmlari bitta joyda.",
        },
        {
          title: 'Avtomatik qayta chaqirish',
          subtitle: 'Automated Recall',
          desc: "Vaqti kelgan bemorlarni tizim o'zi aniqlaydi va ularning Telegram/SMS'iga avtomatik ravishda chiroyli eslatma-taklifnoma yuboradi.",
        },
      ],
    },
    objection: {
      title: 'O\'tish oson — biz hammasini qilamiz',
      text: 'Dasturni o\'rganish uchun 15 daqiqa yetarli. Excel va daftarlardagi eski bemorlar bazangizni ham tizimga qo\'shib beramiz va 24/7 qo\'llab-quvvatlaymiz.',
      points: ['24/7 qo\'llab-quvvatlash', 'Eski bazani tizimga qo\'shamiz', '15 daqiqada o\'rganish'],
    },
    pricing: {
      title: 'Tariflar',
      subtitle: 'Barcha tariflarda 7 kunlik bepul sinov, eski bazani tizimga qo\'shish va 24/7 qo\'llab-quvvatlash.',
      perMonth: 'oyiga',
      perDoctor: '× doktor soni',
      example: 'Misol: 4 doktor = 600,000 so\'m/oy',
      plans: [
        {
          name: 'Yakka Doktor',
          desc: 'Yakka stomatologlar uchun',
          features: [
            {
              title: 'Bemorlar bazasi',
              desc: 'Elektron tibbiy karta, davolash tarixi va tish xaritasi.',
            },
            {
              title: 'Onlayn qabul',
              desc: 'QR kod yoki shaxsiy link orqali bemorlar o\'zi yoziladi.',
            },
            {
              title: 'Kelmay qolishni kamaytirish',
              desc: 'Telegram orqali avtomatik eslatmalar.',
            },
            {
              title: 'Aqlli Kalendar',
              desc: 'Kunlik qabullarni tartibga solish va vaqtni tejash.',
            },
            {
              title: 'Statistika',
              desc: 'Daromad va qabullar bo\'yicha aniq hisobotlar.',
            },
            {
              title: 'Ma\'lumotlarni o\'tkazib berish',
              desc: 'Eski qog\'oz daftar yoki Excel fayllaringizni tizimga biz tekinga va xatosiz ko\'chirib beramiz.',
            },
            {
              title: '24/7 Qo\'llab-quvvatlash',
              desc: 'Har qanday savol bo\'yicha doimiy texnik yordam.',
            },
          ],
          price: '150,000 so\'m',
          cta: 'Boshlash',
        },
        {
          name: 'Klinika (Pro)',
          desc: '2–7+ shifokorli klinikalar uchun',
          features: [
            {
              title: 'Yakka Doktor tarifidagi barcha imkoniyatlar',
              desc: '',
            },
            {
              title: 'Xodimlar ierarxiyasi',
              desc: 'Har bir doktorga alohida ruxsat va nazorat tizimi.',
            },
            {
              title: 'KPI hisoblash',
              desc: 'Har bir shifokorning ish unumdorligi va ulushli maoshini avtomatik hisoblash.',
            },
            {
              title: 'Moliya tahlili',
              desc: 'Klinika daromadi, qarzlar va xarajatlarni real vaqtda ko\'rish.',
            },
            {
              title: 'Ombor nazorati',
              desc: 'Materiallar sarfi va qoldiqni avtomatik hisoblash.',
            },
            {
              title: 'Kassa nazorati',
              desc: 'Barcha to\'lovlarni shaffof nazorat qilish.',
            },
            {
              title: 'Ma\'lumotlarni o\'tkazib berish',
              desc: 'Klinikangizdagi barcha bemorlar bazasini qog\'oz daftar yoki Exceldan tizimga biz tekinga va xatosiz o\'tkazib beramiz.',
            },
            {
              title: '24/7 Qo\'llab-quvvatlash',
              desc: 'Jamoangiz uchun doimiy texnik yordam.',
            },
          ],
          price: '150,000 so\'m',
          priceNote: true,
          cta: 'Boshlash',
          popular: true,
        },
      ],
      popular: 'Eng mashhur',
    },
    footerCta: {
      title: 'Klinikangizni yangi bosqichga olib chiqing',
      subtitle: '7 kun bepul sinab ko\'ring. Eski bazangizni tizimga qo\'shamiz va 24/7 qo\'llab-quvvatlaymiz.',
      cta: 'Bepul sinashni boshlash',
    },
    contact: {
      title: 'Kontakt',
      hours: 'Dush–Shan, 09:00–19:00',
      rights: 'Barcha huquqlar himoyalangan.',
      guide: 'Foydalanuvchi qo\'llanmasi',
    },
    demo: {
      title: 'Bepul sinovni boshlash',
      subtitle: 'Ma\'lumotlaringizni qoldiring — 24 soat ichida bog\'lanamiz.',
      clinic: 'Klinikangiz nomi',
      phone: 'Telefon',
      name: 'Ism-sharif',
      message: 'Xabar',
      submit: 'So\'rov yuborish',
      sending: 'Yuborilmoqda...',
      cancel: 'Bekor qilish',
      success: 'So\'rov muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.',
      error: 'Xatolik yuz berdi. Qayta urinib ko\'ring.',
    },
    mobile: {
      trial: 'Bepul sinash',
      call: 'Qo\'ng\'iroq',
    },
  },
  ru: {
    nav: {
      features: 'Возможности',
      pricing: 'Тарифы',
      contact: 'Контакты',
      cta: 'Попробовать 7 дней бесплатно',
    },
    hero: {
      badge: 'Облачная CRM для стоматологий',
      headline: "Не делайте пациентов 'одноразовыми' — превратите в постоянных клиентов!",
      subheadline:
        'ShifoCRM — умная база данных и система автоматического возврата пациентов, созданная специально для стоматологий.',
      cta: 'Начать 7 дней БЕСПЛАТНО',
      subtext: 'Старую базу пациентов из Excel и тетрадей тоже добавим в систему',
      trust: ['Поддержка 24/7', 'Добавим старую базу в систему', 'SMS и Telegram напоминания'],
    },
    salesStrengths: {
      title: 'Главные аргументы для перехода на ShifoCRM',
      items: [
        {
          title: 'Поддержка 24/7',
          desc: 'Круглосуточная техподдержка — мы всегда рядом, если возникнет вопрос.',
        },
        {
          title: 'Добавим старую базу в систему',
          desc: 'Старую базу пациентов из Excel и тетрадей тоже внесём в систему — вам ничего делать не нужно.',
        },
      ],
    },
    problems: {
      title: 'Какие проблемы есть в вашей клинике?',
      subtitle: 'Бумажные тетради и ручное управление снижают прибыль клиники.',
      cards: [
        {
          title: 'Хаос в бумажных тетрадях',
          desc: 'База разбросана, найти нужного пациента сложно, есть риск потери данных.',
        },
        {
          title: 'Пациенты забывают о приеме?',
          desc: 'Администратор не успевает всех обзвонить. Кресла пустуют, клиника теряет прибыль.',
        },
        {
          title: 'Данные не в одном месте',
          desc: 'Снимки, зубная формула и история хранятся отдельно. Врач тратит время на поиск.',
        },
      ],
    },
    solution: {
      title: 'Решение ShifoCRM',
      subtitle: 'Безопасно храните базу пациентов и автоматически возвращайте их на приём.',
      blocks: [
        {
          title: 'Умная цифровая база',
          subtitle: 'Smart Cloud Database',
          desc: 'Надёжная облачная база пациентов. История визитов, зубная формула и снимки всегда под рукой.',
        },
        {
          title: 'Автоматический возврат',
          subtitle: 'Automated Recall',
          desc: 'Система сама видит, кого пора пригласить на осмотр, и автоматически отправляет напоминание в Telegram/SMS.',
        },
      ],
    },
    objection: {
      title: 'Переход простой — мы всё сделаем за вас',
      text: 'Обучение займёт 15 минут. Старую базу пациентов из Excel и тетрадей тоже добавим в систему и обеспечим поддержку 24/7.',
      points: ['Поддержка 24/7', 'Добавим старую базу в систему', 'Обучение за 15 минут'],
    },
    pricing: {
      title: 'Тарифы',
      subtitle: 'На всех тарифах — 7 дней бесплатно, добавление старой базы в систему и поддержка 24/7.',
      perMonth: 'в месяц',
      perDoctor: '× количество врачей',
      example: 'Пример: 4 врача = 600 000 сум/мес',
      plans: [
        {
          name: 'Один врач',
          desc: 'Для одного стоматолога',
          features: [
            {
              title: 'База пациентов',
              desc: 'Электронная медкарта, история лечения и зубная карта.',
            },
            {
              title: 'Онлайн-запись',
              desc: 'Пациенты записываются сами через QR-код или персональную ссылку.',
            },
            {
              title: 'Меньше неявок',
              desc: 'Автоматические напоминания в Telegram.',
            },
            {
              title: 'Умный календарь',
              desc: 'Упорядочивание ежедневных приёмов и экономия времени.',
            },
            {
              title: 'Статистика',
              desc: 'Точные отчёты по доходам и приёмам.',
            },
            {
              title: 'Перенос данных',
              desc: 'Бесплатно и без ошибок перенесём вашу старую базу из тетрадей или Excel в систему.',
            },
            {
              title: 'Поддержка 24/7',
              desc: 'Постоянная техподдержка по любым вопросам.',
            },
          ],
          price: '150 000 сум',
          cta: 'Начать',
        },
        {
          name: 'Клиника (Pro)',
          desc: 'Для клиник с 2–7+ врачами',
          features: [
            {
              title: 'Все возможности тарифа «Один врач»',
              desc: '',
            },
            {
              title: 'Иерархия сотрудников',
              desc: 'Отдельные права доступа и контроль для каждого врача.',
            },
            {
              title: 'Расчёт KPI',
              desc: 'Автоматический расчёт продуктивности и процентной зарплаты каждого врача.',
            },
            {
              title: 'Финансовая аналитика',
              desc: 'Доходы, долги и расходы клиники в реальном времени.',
            },
            {
              title: 'Контроль склада',
              desc: 'Автоматический учёт расхода материалов и остатков.',
            },
            {
              title: 'Контроль кассы',
              desc: 'Прозрачный учёт всех платежей.',
            },
            {
              title: 'Перенос данных',
              desc: 'Бесплатно и без ошибок перенесём всю базу пациентов клиники из тетрадей или Excel в систему.',
            },
            {
              title: 'Поддержка 24/7',
              desc: 'Постоянная техподдержка для вашей команды.',
            },
          ],
          price: '150 000 сум',
          priceNote: true,
          cta: 'Начать',
          popular: true,
        },
      ],
      popular: 'Популярный',
    },
    footerCta: {
      title: 'Переведите клинику на новый уровень',
      subtitle: 'Попробуйте 7 дней бесплатно. Добавим старую базу в систему и обеспечим поддержку 24/7.',
      cta: 'Начать бесплатно',
    },
    contact: {
      title: 'Контакты',
      hours: 'Пн–Сб, 09:00–19:00',
      rights: 'Все права защищены.',
      guide: 'Руководство пользователя',
    },
    demo: {
      title: 'Начать бесплатный период',
      subtitle: 'Оставьте данные — свяжемся в течение 24 часов.',
      clinic: 'Название клиники',
      phone: 'Телефон',
      name: 'Ф.И.О.',
      message: 'Сообщение',
      submit: 'Отправить заявку',
      sending: 'Отправка...',
      cancel: 'Отмена',
      success: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
      error: 'Произошла ошибка. Попробуйте снова.',
    },
    mobile: {
      trial: 'Бесплатно',
      call: 'Позвонить',
    },
  },
} as const;

const TELEGRAM_BOT_TOKEN = '8537318966:AAFImCxi9M_vjhjKmWvy0jXaVYm_Fvn_L_U';
const TELEGRAM_CHAT_ID = '7736700647';

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToGuide }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('shifocrm-lang');
    return saved === 'ru' ? 'ru' : 'uz';
  });
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoStatus, setDemoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [demoError, setDemoError] = useState('');
  const [demoForm, setDemoForm] = useState({
    clinicName: '',
    fullName: '',
    phone: '',
    message: '',
  });

  const t = translations[lang];
  const logoSrc = '/img/shifocrm_logo.png';

  useEffect(() => {
    localStorage.setItem('shifocrm-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const switchLang = (next: Lang) => setLang(next);

  const openDemo = () => {
    setDemoOpen(true);
    setDemoStatus('idle');
    setDemoError('');
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
      `🌐 Til: ${lang.toUpperCase()}`,
    ].join('\n');

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: String(TELEGRAM_CHAT_ID),
          text: payload,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.description || 'Telegram send failed');
      }

      setDemoStatus('success');
      setDemoForm({ clinicName: '', fullName: '', phone: '', message: '' });
    } catch (error) {
      setDemoError(error instanceof Error ? error.message : 'Telegram send failed');
      setDemoStatus('error');
    } finally {
      setDemoSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-shifo-primary selection:text-white pb-24 md:pb-0">
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass-effect border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img src={logoSrc} alt="ShifoCRM" className="h-9 w-9 sm:h-11 sm:w-11 object-contain" />
            <div>
              <p className="text-lg sm:text-xl font-display font-extrabold text-shifo-navy leading-none">
                SHIFO<span className="text-shifo-primary">CRM</span>
              </p>
              <p className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-slate-400 font-semibold hidden sm:block">
                Dental SaaS
              </p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-shifo-primary transition-colors">{t.nav.features}</a>
            <a href="#pricing" className="hover:text-shifo-primary transition-colors">{t.nav.pricing}</a>
            <a href="#contact" className="hover:text-shifo-primary transition-colors">{t.nav.contact}</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language toggle */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => switchLang('uz')}
                className={`px-2.5 py-1.5 rounded-md transition-all ${lang === 'uz' ? 'bg-white text-shifo-navy shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                UZ
              </button>
              <button
                type="button"
                onClick={() => switchLang('ru')}
                className={`px-2.5 py-1.5 rounded-md transition-all ${lang === 'ru' ? 'bg-white text-shifo-navy shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                RU
              </button>
            </div>

            <button
              type="button"
              onClick={openDemo}
              className="hidden sm:inline-flex bg-shifo-cta text-white px-4 lg:px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-shifo-ctaHover transition-colors shadow-lg shadow-green-500/25"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-shifo-light/60 via-white to-white pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-shifo-primary/10 blur-3xl" />
        <div className="absolute top-10 -right-16 h-80 w-80 rounded-full bg-shifo-cta/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-slide-up">
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase bg-white border border-shifo-border rounded-full px-4 py-2 mb-6 text-shifo-primary shadow-sm">
                <Stethoscope className="h-4 w-4" />
                {t.hero.badge}
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-display font-extrabold text-shifo-navy leading-[1.12] tracking-tight">
                {t.hero.headline}
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                {t.hero.subheadline}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={openDemo}
                  className="bg-shifo-cta text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg inline-flex items-center justify-center gap-2 hover:bg-shifo-ctaHover transition-all shadow-xl shadow-green-500/30 hover:shadow-green-500/40 hover:-translate-y-0.5"
                >
                  {t.hero.cta}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-5 text-sm font-semibold text-shifo-cta flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0" />
                {t.hero.subtext}
              </p>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                {t.hero.trust.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-shifo-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero visual */}
            <div className="relative animate-fade-in">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-shifo-navy/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-shifo-light flex items-center justify-center">
                      <Database className="h-5 w-5 text-shifo-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-shifo-navy text-sm">Smart Cloud Database</p>
                      <p className="text-xs text-slate-400">2,847 {lang === 'uz' ? 'bemor' : 'пациентов'}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">24/7</span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: lang === 'uz' ? 'Aziza R.' : 'Азиза Р.', status: lang === 'uz' ? '6 oy tekshiruv' : '6 мес. осмотр', recall: true },
                    { name: lang === 'uz' ? 'Jasur K.' : 'Жасур К.', status: lang === 'uz' ? 'Ertaga qabul' : 'Завтра приём', recall: false },
                    { name: lang === 'uz' ? 'Dilnoza M.' : 'Дилноза М.', status: lang === 'uz' ? 'SMS yuborildi' : 'SMS отправлено', recall: true },
                  ].map((patient) => (
                    <div key={patient.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-shifo-primary to-shifo-secondary flex items-center justify-center text-white text-xs font-bold">
                          {patient.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-800">{patient.name}</p>
                          <p className="text-xs text-slate-500">{patient.status}</p>
                        </div>
                      </div>
                      {patient.recall && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-shifo-cta">
                          <BellRing className="h-3.5 w-3.5" />
                          Recall
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-shifo-navy to-shifo-dark text-white">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <MessageCircle className="h-4 w-4 text-shifo-cta" />
                    {lang === 'uz' ? 'Avtomatik eslatma yuborildi' : 'Авто-напоминание отправлено'}
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    {lang === 'uz'
                      ? '"Hurmatli Aziza, 6 oylik tekshiruv vaqtingiz keldi!"'
                      : '"Уважаемая Азиза, пора на 6-месячный осмотр!"'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SALES STRENGTHS */}
      <section className="py-12 lg:py-16 bg-shifo-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl sm:text-2xl font-display font-extrabold tracking-tight mb-8">
            {t.salesStrengths.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {t.salesStrengths.items.map((item, i) => {
              const Icon = i === 0 ? Headphones : ArrowRightLeft;
              return (
                <article
                  key={item.title}
                  className="flex gap-5 bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors"
                >
                  <div className="h-14 w-14 rounded-2xl bg-shifo-cta/20 flex items-center justify-center shrink-0">
                    <Icon className="h-7 w-7 text-shifo-cta" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-shifo-cta">{item.title}</h3>
                    <p className="mt-2 text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-shifo-navy tracking-tight">
              {t.problems.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{t.problems.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.problems.cards.map((card, i) => (
              <article
                key={card.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 hover:border-red-200 hover:shadow-lg hover:shadow-red-500/5 transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 font-black text-xl mb-5">
                  {i + 1}
                </div>
                <h3 className="font-display font-bold text-xl text-shifo-navy">{card.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION / FEATURES */}
      <section id="features" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-shifo-navy tracking-tight">
              {t.solution.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{t.solution.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {t.solution.blocks.map((block, i) => {
              const Icon = i === 0 ? Cloud : BellRing;
              return (
                <article
                  key={block.title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 hover:border-shifo-primary/30 hover:shadow-xl transition-all"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-shifo-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
                  <div className="relative">
                    <div className="h-14 w-14 rounded-2xl bg-shifo-light flex items-center justify-center text-shifo-primary mb-6">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-shifo-primary mb-2">{block.subtitle}</p>
                    <h3 className="font-display font-extrabold text-2xl text-shifo-navy">{block.title}</h3>
                    <p className="mt-4 text-slate-600 leading-relaxed text-lg">{block.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* OBJECTION HANDLING */}
      <section className="py-16 lg:py-20 bg-shifo-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-extrabold tracking-tight leading-tight">
                {t.objection.title}
              </h2>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">{t.objection.text}</p>
              <button
                type="button"
                onClick={openDemo}
                className="mt-8 bg-shifo-cta text-white px-7 py-4 rounded-2xl font-bold hover:bg-shifo-ctaHover transition-colors inline-flex items-center gap-2 shadow-lg shadow-green-500/25"
              >
                {t.hero.cta}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {t.objection.points.map((point) => (
                <div key={point} className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
                  <div className="h-10 w-10 rounded-xl bg-shifo-cta/20 flex items-center justify-center shrink-0">
                    <Check className="h-5 w-5 text-shifo-cta" />
                  </div>
                  <p className="font-semibold">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-shifo-navy tracking-tight">
              {t.pricing.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{t.pricing.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
            {t.pricing.plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative rounded-3xl border bg-white p-8 flex flex-col ${
                  'popular' in plan && plan.popular
                    ? 'border-shifo-primary shadow-xl shadow-shifo-primary/10 scale-[1.02]'
                    : 'border-slate-200 hover:border-shifo-primary/30 hover:shadow-lg'
                } transition-all`}
              >
                {'popular' in plan && plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-shifo-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    {t.pricing.popular}
                  </span>
                )}
                <h3 className="font-display font-extrabold text-xl text-shifo-navy">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{plan.desc}</p>
                <div className="mt-6">
                  <p className="text-3xl font-black text-shifo-navy">{plan.price}</p>
                  {'priceNote' in plan && plan.priceNote ? (
                    <p className="text-sm text-shifo-primary font-bold mt-1">{t.pricing.perDoctor}</p>
                  ) : (
                    <p className="text-sm text-slate-500 font-medium mt-1">{t.pricing.perMonth}</p>
                  )}
                </div>
                {'priceNote' in plan && plan.priceNote && (
                  <p className="mt-3 text-xs font-semibold text-slate-500 bg-slate-100 rounded-lg px-3 py-2">
                    {t.pricing.example}
                  </p>
                )}
                <ul className="mt-6 space-y-4 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.title} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-shifo-cta shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 leading-snug">{feature.title}</p>
                        {feature.desc ? (
                          <p className="mt-0.5 text-slate-500 leading-relaxed">{feature.desc}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={openDemo}
                  className={`mt-8 w-full py-3.5 rounded-xl font-bold transition-colors ${
                    'popular' in plan && plan.popular
                      ? 'bg-shifo-cta text-white hover:bg-shifo-ctaHover shadow-lg shadow-green-500/20'
                      : 'bg-shifo-navy text-white hover:bg-shifo-dark'
                  }`}
                >
                  {plan.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-shifo-navy via-shifo-dark to-shifo-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-display font-extrabold tracking-tight">
            {t.footerCta.title}
          </h2>
          <p className="mt-5 text-lg text-slate-300">{t.footerCta.subtitle}</p>
          <button
            type="button"
            onClick={openDemo}
            className="mt-8 bg-shifo-cta text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-shifo-ctaHover transition-all inline-flex items-center gap-2 shadow-xl shadow-green-500/30 hover:-translate-y-0.5"
          >
            {t.footerCta.cta}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-12 bg-slate-950 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <p className="font-display font-extrabold text-2xl text-white">
              SHIFO<span className="text-shifo-primary">CRM</span>
            </p>
            <p className="mt-3 text-slate-400 leading-relaxed text-sm">
              {t.hero.subheadline}
            </p>
            <button
              type="button"
              onClick={onNavigateToGuide}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-shifo-primary hover:text-shifo-secondary transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              {t.contact.guide}
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-semibold text-white text-base">{t.contact.title}</p>
            <a href="tel:+998940542722" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="h-4 w-4 text-shifo-primary shrink-0" /> +998 94 054 27 22
            </a>
            <p className="flex items-center gap-2"><Send className="h-4 w-4 text-shifo-primary" /> @shifocrm</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-shifo-primary" /> Toshkent, O&apos;zbekiston</p>
            <p className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-shifo-primary" /> {t.contact.hours}</p>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-semibold text-white text-base">ShifoCRM</p>
            <a href="#features" className="block hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#pricing" className="block hover:text-white transition-colors">{t.nav.pricing}</a>
            <a href="#contact" className="block hover:text-white transition-colors">{t.nav.contact}</a>
            <p className="pt-4 text-slate-500">© 2026 ShifoCRM. {t.contact.rights}</p>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 p-3">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={openDemo} className="bg-shifo-cta text-white text-center py-3 rounded-xl font-bold text-sm">
            {t.mobile.trial}
          </button>
          <a href="tel:+998940542722" className="bg-shifo-navy text-white text-center py-3 rounded-xl font-semibold text-sm flex items-center justify-center">
            {t.mobile.call}
          </a>
        </div>
      </div>

      {/* Demo modal */}
      {demoOpen && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-shifo-navy/60 px-3 sm:px-4 py-3 sm:py-6 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
            <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-slate-100">
              <div>
                <p className="text-xs uppercase tracking-widest text-shifo-primary font-bold">{t.demo.title}</p>
                <p className="mt-1 text-sm text-slate-500">{t.demo.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setDemoOpen(false)}
                className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleDemoSubmit} className="p-5 sm:p-6 space-y-4">
              <label className="block text-sm font-semibold text-slate-700">
                {t.demo.clinic} *
                <input
                  value={demoForm.clinicName}
                  onChange={(e) => setDemoForm((prev) => ({ ...prev, clinicName: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shifo-cta/40"
                  required
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                {t.demo.phone} *
                <input
                  value={demoForm.phone}
                  onChange={(e) => setDemoForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shifo-cta/40"
                  placeholder="+998 __ ___ __ __"
                  required
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                {t.demo.name}
                <input
                  value={demoForm.fullName}
                  onChange={(e) => setDemoForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shifo-cta/40"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                {t.demo.message}
                <textarea
                  value={demoForm.message}
                  onChange={(e) => setDemoForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shifo-cta/40"
                  rows={3}
                />
              </label>

              {demoStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-800 font-semibold">
                  ✅ {t.demo.success}
                </div>
              )}

              {demoStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-800 font-semibold">
                  ❌ {demoError || t.demo.error}
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDemoOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {t.demo.cancel}
                </button>
                <button
                  type="submit"
                  disabled={demoSubmitting}
                  className="px-6 py-3 rounded-xl bg-shifo-cta text-white font-bold hover:bg-shifo-ctaHover disabled:opacity-60"
                >
                  {demoSubmitting ? t.demo.sending : t.demo.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

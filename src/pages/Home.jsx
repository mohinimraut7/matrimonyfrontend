import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeCards from "../components/HomeCards";
import Review from "../components/Review";
import KundaliSection from "../components/KundaliSection";
import FaqSection from "../components/FaqSection";
import ProfileBanner from "../components/ProfileBanner";
import CompleteProfile from "./CompleteProfile";
import { useTranslation } from "react-i18next";


const HERO_IMAGES = [
  "https://imgs.search.brave.com/vLSQbXzsQDHKlZrbNiK9Br-QT69MoTtDh6yk8gMOJC0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGluYW5kamlyc2Eu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8w/MDA3LU1OLVBlbGlj/YW4tSGlsbC1TYW5n/ZWV0LVdlZGRpbmct/UGhvdG9zLmpwZw",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&q=80",
  "https://i.pinimg.com/originals/6e/1f/6d/6e1f6da0ef6df37849f4e1ade509432d.jpg",
];

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex]       = useState(1);
  const [fading, setFading]             = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % HERO_IMAGES.length);
        setNextIndex(prev   => (prev + 1) % HERO_IMAGES.length);
        setFading(false);
      }, 800);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (i) => {
    setNextIndex(i);
    setFading(true);
    setTimeout(() => {
      setCurrentIndex(i);
      setFading(false);
    }, 800);
  };

  return (
    <>
      {/* ── Complete Profile Modal ── */}
      {showProfileModal && (
        <CompleteProfile onClose={() => setShowProfileModal(false)} />
      )}

      {/* ─── HERO ─── */}
      <div className="relative min-h-screen pt-16">

        {/* Banner — opens modal instead of navigating */}
        <div className="relative z-40">
          <ProfileBanner onOpen={() => setShowProfileModal(true)} />
        </div>

        {/* Current image (fades out) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[800ms] ease-in-out"
          style={{
            backgroundImage: `url('${HERO_IMAGES[currentIndex]}')`,
            opacity: fading ? 0 : 1,
          }}
        />

        {/* Next image (always beneath) */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url('${HERO_IMAGES[nextIndex]}')` }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/75 via-amber-950/55 to-transparent z-[1]" />

        {/* Hero content */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 flex items-center min-h-[calc(100vh-64px)]">
          <div className="max-w-[560px]">
            <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-amber-300 mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              {t("home.tagline")}
            </p>
            <h1 className="text-[clamp(2.6rem,5vw,3.8rem)] font-bold text-white leading-[1.1] tracking-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t("home.title1")}
              <br />
              <span className="font-medium text-amber-200">{t("home.title2")}</span>
            </h1>
            <p className="text-white/75 text-base leading-relaxed max-w-[420px]"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              {t("home.description")}
            </p>
            <button
              onClick={() => navigate("/matches")}
              className="mt-6 inline-block px-8 py-3 bg-[#c2852a] text-white text-sm font-semibold tracking-wide rounded-xl border-none cursor-pointer transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              {t("home.cta")}
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)}
              className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all duration-300 p-0 ${
                i === currentIndex ? "bg-[#c2852a] scale-125" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <KundaliSection />
      <HomeCards />
      <Review />
      <FaqSection />
    </>
  );
}






import { useNavigate } from "react-router-dom";
import kundaliImg from "../assets/kundali.jpg";
import { useTranslation } from "react-i18next";


export default function KundaliSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* ── LEFT: Photo ── */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#e8e2d8] w-full md:w-[440px] md:flex-shrink-0 aspect-[4/3]">
            <img
            src={kundaliImg}
            alt="Kundali Matching for Marriage"
            className="w-full h-full object-cover block"
            />

          {/* Bottom pill overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-md rounded-full px-4 py-2">
            <span className="text-sm">⭐</span>
            <span className="text-[#e8c98a] text-xs font-semibold tracking-wide">
              {t("kundaliSection.badge")}
            </span>
          </div>
        </div>

        {/* ── RIGHT: Text ── */}
        <div className="flex-1">

          {/* Pill tag */}
          <div className="inline-flex items-center gap-1.5 bg-[#fdf6ec] border border-[#f0ddb8] text-[#c2852a] rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest mb-4">
            ✦ {t("kundaliSection.tag")}
          </div>

          {/* Heading */}
          <h2
            className="text-[#1c1917] font-bold leading-tight tracking-tight mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
            }}
          >
            {t("kundaliSection.title1")}
            <br />
            <span className="italic font-semibold text-[#c2852a]">
              {t("kundaliSection.title2")}
            </span>
          </h2>

          {/* Description */}
          <p className="text-[#9a8c7a] text-[0.92rem] leading-relaxed mb-7 max-w-md">
          {t("kundaliSection.description")}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/kundali")}
            className="inline-flex items-center gap-2 bg-[#c2852a] hover:bg-[#a8701f] text-white text-sm font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-[0_3px_16px_rgba(194,133,42,0.32)] hover:shadow-[0_6px_22px_rgba(194,133,42,0.38)] cursor-pointer"
          >
            {t("kundaliSection.cta")} →
          </button>

        </div>
      </div>
    </section>
  );
}
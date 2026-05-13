import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FaqSection() {
  const { t } = useTranslation();
  const faqs = t("faq.items", { returnObjects: true });
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="text-[#1c1917] font-bold mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 2.6rem)" }}
          >
            {t("faq.title")}
          </h2>
          <p className="text-[#9a8c7a] text-sm max-w-xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-white border border-[#ece8e1] rounded-2xl overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center text-left px-6 py-5"
                >
                  <span className="text-[#1c1917] font-semibold text-sm">{f.q}</span>
                  <span className="text-xl font-bold" style={{ color: "#c2852a" }}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-[#5a5048] text-sm leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

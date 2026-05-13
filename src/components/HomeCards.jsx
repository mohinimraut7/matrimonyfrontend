import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CARD_WIDTH = 300;
const CARD_GAP = 24;
const CARD_TOTAL = CARD_WIDTH + CARD_GAP;

function HomeCards() {
  const { t } = useTranslation();
  const cards = t("homeCards.cards", { returnObjects: true });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const translateX = `calc(50% - ${activeIndex * CARD_TOTAL + CARD_WIDTH / 2}px)`;

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">
            {t("homeCards.sectionTag")}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
            {t("homeCards.sectionTitle")}
          </h2>
          <p className="text-gray-500 mt-4 text-base max-w-md mx-auto">
            {t("homeCards.sectionDesc")}
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden py-10">
          <div
            style={{
              display: "flex",
              gap: `${CARD_GAP}px`,
              transform: `translateX(${translateX})`,
              transition: "transform 0.8s cubic-bezier(0.34,1.2,0.64,1)",
              willChange: "transform",
            }}
          >
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              const isAdjacent = Math.abs(index - activeIndex) === 1;

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    minWidth: `${CARD_WIDTH}px`,
                    width: `${CARD_WIDTH}px`,
                    transform: isActive
                      ? "scale(1.1) translateY(-18px)"
                      : isAdjacent
                      ? "scale(1.02) translateY(-4px)"
                      : "scale(0.92) translateY(0px)",
                    opacity: isActive ? 1 : isAdjacent ? 0.72 : 0.45,
                    transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease, box-shadow 0.4s ease",
                    boxShadow: isActive
                      ? "0 28px 52px rgba(0,0,0,0.15)"
                      : isAdjacent
                      ? "0 8px 24px rgba(0,0,0,0.07)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    backgroundColor: "white",
                    borderRadius: "24px",
                    padding: "32px",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px",
                      backgroundColor: "#fffbeb",
                      border: "1px solid #fde68a",
                      color: "#b45309",
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: "24px",
                    }}
                  >
                    {card.number}
                  </div>

                  <h3 style={{ fontSize: "20px", fontFamily: "serif", color: "#111827", marginBottom: "12px" }}>
                    {card.title}
                  </h3>

                  <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "8px" }}>
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                height: "8px",
                width: index === activeIndex ? "20px" : "8px",
                borderRadius: "9999px",
                backgroundColor: index === activeIndex ? "#d97706" : "#fcd34d",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default HomeCards;
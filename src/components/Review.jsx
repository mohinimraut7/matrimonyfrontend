import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const CARD_WIDTH = 340;
const CARD_GAP = 24;
const CARD_TOTAL = CARD_WIDTH + CARD_GAP;


function Review() {
  const { t } = useTranslation();
  const REVIEWS = t("review.list", { returnObjects: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
      }, 3500);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const translateX = `calc(50% - ${activeIndex * CARD_TOTAL + CARD_WIDTH / 2}px)`;

  return (
    <section className="py-24 border-t border-amber-100">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">
            {t("review.tag")}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
            {t("review.title")}
          </h2>
          <p className="text-gray-500 mt-4 text-base">
            {t("review.desc")}
          </p>
        </div>

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
            {REVIEWS.map((review, index) => {
              const isActive = index === activeIndex;
              const isAdjacent = Math.abs(index - activeIndex) === 1;

              return (
                <div
                  key={review.id}
                  onMouseEnter={() => { setActiveIndex(index); setIsPaused(true); }}
                  onMouseLeave={() => setIsPaused(false)}
                  style={{
                    minWidth: `${CARD_WIDTH}px`,
                    width: `${CARD_WIDTH}px`,
                    transform: isActive ? "scale(1.1) translateY(-18px)" : isAdjacent ? "scale(1.02) translateY(-4px)" : "scale(0.92) translateY(0px)",
                    opacity: isActive ? 1 : isAdjacent ? 0.72 : 0.45,
                    transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease, box-shadow 0.4s ease",
                    boxShadow: isActive ? "0 28px 52px rgba(0,0,0,0.15)" : isAdjacent ? "0 8px 24px rgba(0,0,0,0.07)" : "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    backgroundColor: "white",
                    borderRadius: "24px",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ width: "100%", height: "192px", overflow: "hidden" }}>
                    <img src={review.photo} alt={review.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>

                  <div style={{ padding: "32px" }}>
                    <p style={{ color: "#fcd34d", fontSize: "36px", fontFamily: "serif", lineHeight: 1, marginBottom: "12px" }}>"</p>
                    <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>{review.text}</p>

                    <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "2px solid #fde68a", flexShrink: 0 }}>
                        <img src={review.photo} alt={review.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, color: "#1f2937", fontSize: "14px", fontFamily: "serif" }}>{review.name}</p>
                        <p style={{ fontSize: "12px", color: "#9ca3af" }}>{review.location}</p>
                      </div>
                      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px", backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "9999px", padding: "2px 8px" }}>
                        <span style={{ color: "#f59e0b", fontSize: "11px" }}>✓</span>
                        <span style={{ color: "#b45309", fontSize: "10px", fontWeight: 500 }}>{t("review.verified")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "8px" }}>
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                height: "8px",
                width: i === activeIndex ? "20px" : "8px",
                borderRadius: "9999px",
                backgroundColor: i === activeIndex ? "#d97706" : "#fcd34d",
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

export default Review;
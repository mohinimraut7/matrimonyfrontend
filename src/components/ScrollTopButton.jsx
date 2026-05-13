import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-10 z-[999] bg-[#c2852a] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#a96d1f]"
    >
      ↑
    </button>
  );
}
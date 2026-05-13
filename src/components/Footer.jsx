import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{ background: "#1c1917" }} className="text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-5 gap-8">

        {/* Brand */}
        <div className="md:col-span-2">
          <h3
            className="text-white font-semibold text-xl mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("footer.brand")}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            {t("footer.tagline")}
          </p>
          <div className="mt-4 w-10 h-[2px]" style={{ background: "#c2852a" }} />
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
            {t("footer.quickLinks")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-gray-400 hover:text-[#c2852a] transition-colors">{t("footer.links.home")}</Link></li>
            <li><Link to="/matches" className="text-gray-400 hover:text-[#c2852a] transition-colors">{t("footer.links.browseMatches")}</Link></li>
            <li><Link to="/shortlist" className="text-gray-400 hover:text-[#c2852a] transition-colors">{t("footer.links.shortlist")}</Link></li>
            <li><Link to="/interests" className="text-gray-400 hover:text-[#c2852a] transition-colors">{t("footer.links.interests")}</Link></li>
            <li><Link to="/kundali" className="text-gray-400 hover:text-[#c2852a] transition-colors">{t("footer.links.kundali")}</Link></li>
            <li><Link to="/profile" className="text-gray-400 hover:text-[#c2852a] transition-colors">{t("footer.links.myProfile")}</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
            {t("footer.company")}
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="text-gray-400 hover:text-[#c2852a] transition-colors">{t("footer.links.login")}</Link></li>
            <li><Link to="/register" className="text-gray-400 hover:text-[#c2852a] transition-colors">{t("footer.links.register")}</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-[#c2852a] transition-colors">{t("footer.links.about")}</Link></li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
            {t("footer.followUs")}
          </h4>
          <div className="flex flex-col gap-3 text-sm">
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-[#c2852a] transition-colors">
              <span>🌐</span> {t("footer.links.website")}
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-[#c2852a] transition-colors">
              <span>📘</span> {t("footer.links.facebook")}
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-[#c2852a] transition-colors">
              <span>📸</span> {t("footer.links.instagram")}
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div
        className="border-t text-center py-4 text-sm"
        style={{ borderColor: "#2d2926", color: "#6b6560" }}
      >
        <div>{t("footer.copyright")}</div>
        <div className="mt-1">{t("footer.Developed_by")}</div>
      </div>

    </footer>
  );
}

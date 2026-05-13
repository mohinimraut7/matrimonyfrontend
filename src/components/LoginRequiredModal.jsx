import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LoginRequiredModal({ onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center animate-scaleIn">
        <h3 className="text-xl font-bold mb-2">{t("loginModal.title")}</h3>
        <p className="text-gray-600 mb-6">{t("loginModal.desc")}</p>
        <div className="flex gap-3">
          <button onClick={() => navigate("/login")} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold">
            {t("loginModal.loginBtn")}
          </button>
          <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
            {t("loginModal.cancelBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}

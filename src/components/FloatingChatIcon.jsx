import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingChatIcon() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/chats")}
      className="fixed bottom-8 right-15 z-50 cursor-pointer"
    >
      <div className="bg-white text-blue-400 p-4 rounded-full shadow-lg">
        <MessageCircle size={22} />
      </div>
    </div>
  );
}
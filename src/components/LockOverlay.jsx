import { Lock } from "lucide-react";

export default function LockOverlay({ onUnlock }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-2xl">
      <div className="text-center px-6">
        <Lock className="w-10 h-10 mx-auto text-indigo-600 mb-3" />
        <p className="font-semibold text-gray-800 mb-2">
          Unlock full profile
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Send interest or upgrade to view complete details
        </p>
        <button
          onClick={onUnlock}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          Unlock Now
        </button>
      </div>
    </div>
  );
}


export default function ChatListItem({ profile, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100"
    >
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold">
        {profile.name[0]}
      </div>

      <div className="flex-1">
        <p className="font-semibold">{profile.name}</p>
        <p className="text-sm text-gray-600 truncate">
          {profile.lastMessage}
        </p>
      </div>
    </div>
  );
}
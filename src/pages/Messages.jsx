import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import chatProfiles from "../data/chatProfiles";

// Initial messages keyed by profile id
const INITIAL_MESSAGES = {
  1: [
    { id: 1, from: "them", text: "Hi 👋" },
    { id: 2, from: "them", text: "Hi, how are you?" },
  ],
  2: [
    { id: 1, from: "them", text: "Hello!" },
    { id: 2, from: "them", text: "Let's talk tomorrow 😊" },
  ],
  3: [
    { id: 1, from: "them", text: "Hey there! Came across your profile 😊" },
    { id: 2, from: "me",   text: "Hi Riya! Thanks for connecting." },
    { id: 3, from: "them", text: "When are you free?" },
  ],
  4: [
    { id: 1, from: "them", text: "Nice to meet you!" },
    { id: 2, from: "me",   text: "Nice to meet you too 😊" },
  ],
  5: [
    { id: 1, from: "them", text: "Hi! Loved your profile 🌸" },
    { id: 2, from: "them", text: "Looking forward to it 😊" },
  ],
  6: [
    { id: 1, from: "them", text: "Hello!" },
    { id: 2, from: "them", text: "Sounds great!" },
    { id: 3, from: "them", text: "When can we talk?" },
  ],
};

const EMOJI_LIST = [
  "😊","😼","🐭","😂","❤️","😍","🙏","😭","😘","👍","🥰","😁",
  "🎉","✨","💕","😅","🤣","💯","🔥","😢","🤔","😴",
  "👏","🌸","💐","😎","🤗","😇","🥹","💖","🌟","😋",
  "🫶","💌","🤍","🌺","🎊","😏","🥂","🌹","💍","🫀",
];

export default function Messages() {
  const navigate = useNavigate();
  const { id } = useParams();

  const defaultId = id
    ? chatProfiles.find(p => String(p.id) === String(id))?.id ?? chatProfiles[0]?.id
    : chatProfiles[0]?.id;

  const [selectedId, setSelectedId] = useState(defaultId);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiRef = useRef(null);

  const selectedProfile = chatProfiles.find(p => p.id === selectedId);
  const filteredProfiles = chatProfiles.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const currentMessages = messages[selectedId] || [];

  const sendMessage = () => {
    if (!input.trim() || !selectedId) return;
    setMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), { id: Date.now(), from: "me", text: input.trim() }],
    }));
    setInput("");
    setShowEmoji(false);
  };

  const handleKey = (e) => { if (e.key === "Enter") sendMessage(); };
  const addEmoji = (emoji) => setInput(prev => prev + emoji);

  useEffect(() => {
    const handler = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) setShowEmoji(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const getInitials = (name) =>
    name ? name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?";

  return (
    <div style={{
      fontFamily: "Georgia, serif", backgroundColor: "#f0ece4",
      position: "fixed", top: "64px", left: 0, right: 0, bottom: 0,
      display: "flex", alignItems: "stretch", justifyContent: "center", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", width: "100%", maxWidth: "1100px",
        height: "100%", gap: "16px", padding: "24px", boxSizing: "border-box",
      }}>

        {/* ── LEFT PANEL ── */}
        <div style={{
          width: "340px", flexShrink: 0, backgroundColor: "#fff",
          borderRadius: "20px", border: "1px solid #e8e2d9",
          display: "flex", flexDirection: "column", overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}>
          <div style={{ padding: "24px 20px 16px" }}>
            <button onClick={() => navigate(-1)} style={{
              background: "none", border: "none", cursor: "pointer", color: "#888",
              fontSize: "13px", fontFamily: "sans-serif", padding: 0, marginBottom: "16px",
              display: "flex", alignItems: "center", gap: "6px",
            }}>← Back</button>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: "normal", color: "#1a1a1a", margin: "0 0 4px" }}>
              Messages
            </h2>
            <p style={{ fontSize: "13px", color: "#999", fontFamily: "sans-serif", margin: "0 0 16px" }}>
              Your recent conversations
            </p>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#bbb", fontSize: "14px" }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search conversations..."
                style={{
                  width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 34px",
                  borderRadius: "10px", border: "1px solid #e8e2d9", backgroundColor: "#faf8f5",
                  fontSize: "13px", fontFamily: "sans-serif", color: "#333", outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ height: "1px", backgroundColor: "#f0ece4", margin: "0 20px" }} />

          {/* Profile List */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredProfiles.map((profile, idx) => {
              const isSelected = profile.id === selectedId;
              const unread = profile.unread || 0;

              return (
                <div key={profile.id}>
                  <div
                    onClick={() => setSelectedId(profile.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px",
                      padding: "14px 20px", cursor: "pointer",
                      backgroundColor: isSelected ? "#fdf6ec" : "transparent",
                      borderLeft: isSelected ? "3px solid #c8a96e" : "3px solid transparent",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = "#faf8f5"; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{
                        width: "46px", height: "46px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #b5a898 0%, #8a7d6e 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: "14px", fontFamily: "Georgia, serif", letterSpacing: "1px",
                      }}>{getInitials(profile.name)}</div>
                      {profile.online && (
                        <div style={{
                          position: "absolute", bottom: "2px", right: "2px",
                          width: "10px", height: "10px", borderRadius: "50%",
                          backgroundColor: "#4caf7d", border: "2px solid #fff",
                        }} />
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#1a1a1a" }}>{profile.name}</span>
                        <span style={{ fontSize: "11px", color: "#bbb", fontFamily: "sans-serif" }}>{profile.time || ""}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3px" }}>
                        <p style={{
                          fontSize: "12px", color: "#999", fontFamily: "sans-serif",
                          margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px",
                        }}>{profile.lastMessage || ""}</p>
                        {unread > 0 && (
                          <div style={{
                            backgroundColor: "#1a1a1a", color: "#fff", borderRadius: "50%",
                            width: "20px", height: "20px", display: "flex", alignItems: "center",
                            justifyContent: "center", fontSize: "11px", fontFamily: "sans-serif",
                            fontWeight: "bold", flexShrink: 0,
                          }}>{unread}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  {idx < filteredProfiles.length - 1 && (
                    <div style={{ height: "1px", backgroundColor: "#f5f1eb", margin: "0 20px" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{
          flex: 1, backgroundColor: "#fff", borderRadius: "20px",
          border: "1px solid #e8e2d9", display: "flex", flexDirection: "column",
          overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}>
          {selectedProfile ? (
            <>
              {/* Chat Header */}
              <div style={{
                padding: "16px 24px", borderBottom: "1px solid #f0ece4",
                display: "flex", alignItems: "center", gap: "14px", backgroundColor: "#fff",
              }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #b5a898 0%, #8a7d6e 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: "15px", fontFamily: "Georgia, serif", letterSpacing: "1px",
                  }}>{getInitials(selectedProfile.name)}</div>
                  {selectedProfile.online && (
                    <div style={{
                      position: "absolute", bottom: "2px", right: "2px",
                      width: "11px", height: "11px", borderRadius: "50%",
                      backgroundColor: "#4caf7d", border: "2px solid #fff",
                    }} />
                  )}
                </div>
                <div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "17px", color: "#1a1a1a" }}>{selectedProfile.name}</div>
                  <div style={{ fontSize: "12px", fontFamily: "sans-serif", marginTop: "3px", display: "flex", alignItems: "center", gap: "8px" }}>
                    {selectedProfile.online && <span style={{ color: "#4caf7d", fontWeight: "600" }}>● Online</span>}
                    {selectedProfile.online && <span style={{ color: "#ddd" }}>|</span>}
                    <span style={{ color: "#aaa" }}>
                      {[selectedProfile.location, selectedProfile.profession].filter(Boolean).join(" · ") || "India"}
                    </span>
                  </div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <button style={{
                    background: "none", border: "1.5px solid #e8e2d9", borderRadius: "50%",
                    width: "38px", height: "38px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#c8a96e", fontSize: "16px", transition: "border-color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#c8a96e"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e2d9"}
                  >♥</button>
                </div>
              </div>

              {/* Messages Area */}
              <div style={{
                flex: 1, overflowY: "auto", padding: "24px",
                backgroundColor: "#faf8f5", display: "flex", flexDirection: "column", gap: "10px",
              }}>
                {currentMessages.map(msg => (
                  <div key={msg.id} style={{
                    display: "flex",
                    justifyContent: msg.from === "me" ? "flex-end" : "flex-start",
                    alignItems: "flex-end", gap: "8px",
                  }}>
                    {msg.from === "them" && (
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, #b5a898 0%, #8a7d6e 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: "10px", fontFamily: "Georgia, serif",
                      }}>{getInitials(selectedProfile.name)}</div>
                    )}
                    <div style={{
                      maxWidth: "60%", padding: "10px 16px",
                      borderRadius: msg.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      backgroundColor: msg.from === "me" ? "#1a1a1a" : "#fff",
                      color: msg.from === "me" ? "#fff" : "#2a2a2a",
                      fontSize: "14px", fontFamily: "sans-serif", lineHeight: "1.5",
                      border: msg.from === "them" ? "1px solid #ede8e0" : "none",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    }}>{msg.text}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div style={{ padding: "12px 20px", backgroundColor: "#fff", borderTop: "1px solid #f0ece4" }}>

                {/* Emoji Picker */}
                {showEmoji && (
                  <div ref={emojiRef} style={{
                    backgroundColor: "#fff", border: "1px solid #e8e2d9",
                    borderRadius: "16px", padding: "12px", marginBottom: "10px",
                    boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
                    display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "4px",
                  }}>
                    {EMOJI_LIST.map((emoji, i) => (
                      <button key={i} onClick={() => addEmoji(emoji)} style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "20px", padding: "5px", borderRadius: "8px",
                        transition: "background 0.1s", lineHeight: 1,
                      }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f5f1eb"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                      >{emoji}</button>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    onClick={() => setShowEmoji(prev => !prev)}
                    style={{
                      background: showEmoji ? "#f5f1eb" : "none",
                      border: "1px solid #e8e2d9", borderRadius: "50%",
                      width: "40px", height: "40px", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "20px", flexShrink: 0, transition: "background 0.2s",
                    }}
                    title="Emoji"
                  >😊</button>

                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={`Message ${selectedProfile.name.split(" ")[0]}...`}
                    style={{
                      flex: 1, border: "1px solid #e8e2d9", borderRadius: "24px",
                      padding: "11px 18px", fontSize: "14px", fontFamily: "sans-serif",
                      color: "#333", outline: "none", backgroundColor: "#faf8f5",
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    style={{
                      backgroundColor: "#1a1a1a", color: "#fff", border: "none",
                      borderRadius: "50%", width: "44px", height: "44px",
                      cursor: "pointer", fontSize: "16px", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#c8a96e"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1a1a1a"}
                  >➤</button>
                </div>
              </div>
            </>
          ) : (
            <div style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              color: "#bbb", fontFamily: "sans-serif", fontSize: "15px",
            }}>Select a conversation to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}
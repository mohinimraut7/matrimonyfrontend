import { createContext, useContext, useEffect, useState } from "react";

const InterestContext = createContext();

export function InterestProvider({ children }) {
  const [interests, setInterests] = useState(() => {
    const saved = localStorage.getItem("interests");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("interests", JSON.stringify(interests));
  }, [interests]);

  const sendInterest = (profile) => {
    setInterests((prev) => {
      if (prev.find((p) => p.id === profile.id)) return prev;
      return [...prev, { ...profile, sentAt: Date.now() }];
    });
  };

  const removeInterest = (id) => {
    setInterests((prev) => prev.filter((p) => p.id !== id));
  };

  const hasSentInterest = (id) => {
    return interests.some((p) => p.id === id);
  };

  return (
    <InterestContext.Provider
      value={{ interests, sendInterest, removeInterest, hasSentInterest }}
    >
      {children}
    </InterestContext.Provider>
  );
}

export const useInterest = () => useContext(InterestContext);
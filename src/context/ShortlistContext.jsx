import { createContext, useContext, useEffect, useState } from "react";

const ShortlistContext = createContext();

export function ShortlistProvider({ children }) {
  const [shortlist, setShortlist] = useState(() => {
    const saved = localStorage.getItem("shortlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("shortlist", JSON.stringify(shortlist));
  }, [shortlist]);

  const addToShortlist = (profile) => {
    setShortlist((prev) => {
      if (prev.find((p) => p.id === profile.id)) return prev;
      return [...prev, profile];
    });
  };

  const removeFromShortlist = (id) => {
    setShortlist((prev) => prev.filter((p) => p.id !== id));
  };

  const isShortlisted = (id) => {
    return shortlist.some((p) => p.id === id);
  };

  return (
    <ShortlistContext.Provider
      value={{ shortlist, addToShortlist, removeFromShortlist, isShortlisted }}
    >
      {children}
    </ShortlistContext.Provider>
  );
}

export const useShortlist = () => useContext(ShortlistContext);

// import { createContext, useContext, useState } from "react";

// const ProfileContext = createContext();

// const initData = {
//   // step 1
//   firstName: "", lastName: "", dob: "", gender: "", maritalStatus: "", profileFor: "",
//   height: "", weight: "", bodyType: "", complexion: "", mobile: "", about: "",
//   // step 2
//   motherTongue: "", nationality: "", currentCity: "", currentState: "", country: "",
//   birthCity: "", birthTime: "", rashi: "", nakshatra: "", gotra: "", manglik: "",
//   // step 3
//   religion: "", caste: "", subCaste: "", casteNoBar: "", religiousPractice: "", community: "",
//   // step 4
//   fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "",
//   brothers: "", brothersMarried: "", sisters: "", sistersMarried: "",
//   familyType: "", familyValues: "", familyStatus: "", familyLocation: "",
//   // step 5
//   education: "", fieldOfStudy: "", college: "",
//   employmentType: "", occupation: "", company: "", income: "", workLocation: "",
//   // step 6
//   diet: "", smoking: "", drinking: "", fitness: "",
//   languages: [], hobbies: [], vehicle: "", property: "",
//   // step 7
//   partnerAgeMin: "", partnerAgeMax: "",
//   partnerHeightMin: "", partnerHeightMax: "",
//   partnerMaritalStatus: "", partnerReligion: "", partnerCaste: "",
//   partnerEducation: "", partnerIncome: "", partnerLocation: "",
//   partnerDiet: "", partnerManglik: "", partnerDesc: "",
//   // step 8
//   photos: [], idDoc: "",
// };

// export function ProfileProvider({ children }) {
//   const [profileData, setProfileData] = useState(initData);

//   // ✅ Always merges — never loses existing fields
//   const saveProfile = (newData) => {
//     setProfileData(prev => ({ ...prev, ...newData }));
//   };

//   return (
//     <ProfileContext.Provider value={{ profileData, saveProfile }}>
//       {children}
//     </ProfileContext.Provider>
//   );
// }

// export function useProfile() {
//   return useContext(ProfileContext);
// }




import { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

const initData = {
  firstName: "", lastName: "", dob: "", gender: "", maritalStatus: "", profileFor: "",
  height: "", weight: "", bodyType: "", complexion: "", mobile: "", about: "",
  motherTongue: "", nationality: "", currentCity: "", currentState: "", country: "",district: "", taluka: "", pincode: "",
  birthCity: "", birthTime: "", rashi: "", nakshatra: "", gotra: "", manglik: "",
  religion: "", caste: "", subCaste: "", casteNoBar: "", religiousPractice: "", community: "",
  fatherName: "", fatherOccupation: "",fatherDistrict: "", fatherTaluka: "", fatherVillage: "", fatherRelativeSurname: "", motherName: "", motherOccupation: "", motherDistrict: "",motherTaluka: "",motherVillage: "", motherRelativeSurname: "", siblings: "",
  siblingsMarried: "",
  familyType: "", familyValues: "", familyStatus: "", familyLocation: "",
  education: "", fieldOfStudy: "", college: "",
  employmentType: "", occupation: "", company: "", income: "", workLocation: "",
  diet: "", smoking: "", drinking: "", fitness: "",
  languages: [], hobbies: [], vehicle: "", property: "",
  partnerAgeMin: "", partnerAgeMax: "",
  partnerHeightMin: "", partnerHeightMax: "",
  partnerMaritalStatus: "", partnerReligion: "", partnerCaste: "",
  partnerEducation: "", partnerIncome: "", partnerLocation: "",
  partnerDiet: "", partnerManglik: "", partnerDesc: "", preferredSurname: "",
  photos: [], idDoc: "",
};

export function ProfileProvider({ children }) {
  const [profileData, setProfileData] = useState(initData);
  const [profileLoading, setProfileLoading] = useState(true);

  // ✅ KEY FIX: Read token from localStorage IMMEDIATELY on first render
  // This means isLoggedIn is true right away after login — no waiting for fetch
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      // No token = not logged in
      if (!token || !storedUser) {
        setIsLoggedIn(false);
        setProfileLoading(false);
        return;
      }

      const { id } = JSON.parse(storedUser);
      if (!id) {
        setProfileLoading(false);
        return;
      }

      setProfileLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${id}/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        setProfileLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success && data.user) {
        setProfileData(prev => ({ ...prev, ...data.user }));
        setIsLoggedIn(true); // confirm logged in after successful fetch
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  // Runs once on app mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Always merges — never loses existing fields
  const saveProfile = (newData) => {
    setProfileData(prev => ({ ...prev, ...newData }));
  };

  // ✅ Clears everything on logout
  const resetProfile = () => {
    setProfileData(initData);
    setIsLoggedIn(false); // hides Login/Register immediately
  };

  return (
    <ProfileContext.Provider value={{
      profileData,
      saveProfile,
      profileLoading,
      resetProfile,
      refetchProfile: fetchProfile,
      isLoggedIn,
      setIsLoggedIn,   
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
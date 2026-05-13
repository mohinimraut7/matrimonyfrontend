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
  motherTongue: "", nationality: "", currentCity: "", currentState: "", country: "",
  birthCity: "", birthTime: "", rashi: "", nakshatra: "", gotra: "", manglik: "",
  religion: "", caste: "", subCaste: "", casteNoBar: "", religiousPractice: "", community: "",
  fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "",
  brothers: "", brothersMarried: "", sisters: "", sistersMarried: "",
  familyType: "", familyValues: "", familyStatus: "", familyLocation: "",
  education: "", fieldOfStudy: "", college: "",
  employmentType: "", occupation: "", company: "", income: "", workLocation: "",
  diet: "", smoking: "", drinking: "", fitness: "",
  languages: [], hobbies: [], vehicle: "", property: "",
  partnerAgeMin: "", partnerAgeMax: "",
  partnerHeightMin: "", partnerHeightMax: "",
  partnerMaritalStatus: "", partnerReligion: "", partnerCaste: "",
  partnerEducation: "", partnerIncome: "", partnerLocation: "",
  partnerDiet: "", partnerManglik: "", partnerDesc: "",
  photos: [], idDoc: "",
};

export function ProfileProvider({ children }) {
  const [profileData, setProfileData] = useState(initData);
  const [profileLoading, setProfileLoading] = useState(true); // ✅ loading state

  // ✅ Auto-fetch profile on app load if user is logged in
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) { setProfileLoading(false); return; }

        const { id } = JSON.parse(storedUser);
        if (!id) { setProfileLoading(false); return; }

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/${id}/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) { setProfileLoading(false); return; }

        const data = await res.json();
        if (data.success && data.user) {
          // ✅ Merge backend data into context — never lose any field
          setProfileData(prev => ({ ...prev, ...data.user }));
        }
      } catch (err) {
        console.error("Profile auto-fetch error:", err);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []); // runs once on mount

  // ✅ Always merges — never loses existing fields
  const saveProfile = (newData) => {
    setProfileData(prev => ({ ...prev, ...newData }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, saveProfile, profileLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
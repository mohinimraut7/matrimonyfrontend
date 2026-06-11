// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useProfile } from "../context/ProfileContext";
// import { LOCATION_DATA } from "../data/locationData";
// import { useTranslation } from "react-i18next";
// import { useRef } from "react"; 



// /* ─── constants ──────────────────────────────────────────────── */
// const ACCENT  = "#c2852a";
// const DARK    = "#1c1917";
// const BORDER  = "#ece8e1";
// const MUTED   = "#9a8c7a";

// const STEPS = (t) => [
//   { id: 1, label: t("cp.steps.basic"),     icon: "👤" },
//   { id: 2, label: t("cp.steps.personal"),  icon: "🏠" },
//   { id: 3, label: t("cp.steps.religion"),  icon: "🕌" },
//   { id: 4, label: t("cp.steps.family"),    icon: "👨‍👩‍👧" },
//   { id: 5, label: t("cp.steps.education"), icon: "🎓" },
//   { id: 6, label: t("cp.steps.lifestyle"), icon: "🌿" },
//   { id: 7, label: t("cp.steps.partner"),   icon: "💑" },
//   { id: 8, label: t("cp.steps.photos"),    icon: "📸" },
// ];

// /* ─── small shared primitives ────────────────────────────────── */
// function Label({ children, required }) {
//   return (
//     <label className="block text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#9a8c7a] mb-1.5">
//       {children}{required && <span className="text-[#c2852a] ml-0.5">*</span>}
//     </label>
//   );
// }

// function Input({ label, required, type = "text", placeholder, value, onChange, ...rest }) {
//   const [focus, setFocus] = useState(false);
//   return (
//     <div className="mb-4">
//       {label && <Label required={required}>{label}</Label>}
//       <input
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         onFocus={() => setFocus(true)}
//         onBlur={() => setFocus(false)}
//         style={{
//           width: "100%", padding: "9px 13px",
//           border: `1.5px solid ${focus ? ACCENT : BORDER}`,
//           borderRadius: 9, fontFamily: "'Inter', sans-serif",
//           fontSize: "0.83rem", color: DARK,
//           outline: "none", transition: "border-color 0.18s",
//           background: "white",
//         }}
//         {...rest}
//       />
//     </div>
//   );
// }

// function Select({ label, required, value, onChange, options, placeholder }) {
//   const [focus, setFocus] = useState(false);
//   return (
//     <div className="mb-4">
//       {label && <Label required={required}>{label}</Label>}
//       <select
//         value={value}
//         onChange={onChange}
//         onFocus={() => setFocus(true)}
//         onBlur={() => setFocus(false)}
//         style={{
//           width: "100%", padding: "9px 13px",
//           border: `1.5px solid ${focus ? ACCENT : BORDER}`,
//           borderRadius: 9, fontFamily: "'Inter', sans-serif",
//           fontSize: "0.83rem", color: value ? DARK : MUTED,
//           outline: "none", cursor: "pointer",
//           transition: "border-color 0.18s", appearance: "none",
//           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239a8c7a'/%3E%3C/svg%3E")`,
//           backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
//           paddingRight: 30, background: "white",
//         }}
//       >
//         <option value="">{placeholder || "Select…"}</option>
//         {options.map(o => <option key={o} value={o}>{o}</option>)}
//       </select>
//     </div>
//   );
// }

// function Textarea({ label, required, placeholder, value, onChange, rows = 3 }) {
//   const [focus, setFocus] = useState(false);
//   return (
//     <div className="mb-4">
//       {label && <Label required={required}>{label}</Label>}
//       <textarea
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         rows={rows}
//         onFocus={() => setFocus(true)}
//         onBlur={() => setFocus(false)}
//         style={{
//           width: "100%", padding: "9px 13px",
//           border: `1.5px solid ${focus ? ACCENT : BORDER}`,
//           borderRadius: 9, fontFamily: "'Inter', sans-serif",
//           fontSize: "0.83rem", color: DARK,
//           outline: "none", transition: "border-color 0.18s",
//           resize: "vertical", background: "white",
//         }}
//       />
//     </div>
//   );
// }

// function Chips({ label, options, selected, onToggle }) {
//   return (
//     <div className="mb-4">
//       {label && <Label>{label}</Label>}
//       <div className="flex flex-wrap gap-2">
//         {options.map(o => {
//           const active = selected.includes(o);
//           return (
//             <button
//               key={o}
//               type="button"
//               onClick={() => onToggle(o)}
//               className="text-[0.78rem] px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer"
//               style={{
//                 background: active ? ACCENT : "white",
//                 color: active ? "white" : MUTED,
//                 borderColor: active ? ACCENT : BORDER,
//                 fontFamily: "'Inter', sans-serif",
//               }}
//             >
//               {o}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ─── step forms ─────────────────────────────────────────────── */

// function Step1({ d, set, t }) {
//   const genderOptions       = t("cp.options.gender",        { returnObjects: true });
//   const maritalOptions      = t("cp.options.maritalStatus", { returnObjects: true });
//   const profileForOptions   = t("cp.options.profileFor",    { returnObjects: true });
//   const bodyTypeOptions     = t("cp.options.bodyType",      { returnObjects: true });
//   const complexionOptions   = t("cp.options.complexion",    { returnObjects: true });

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Input label={t("cp.s1.firstName")} required placeholder={t("cp.s1.firstNamePh")} value={d.firstName} onChange={e => set("firstName", e.target.value)} />
//         <Input label={t("cp.s1.lastName")}  required placeholder={t("cp.s1.lastNamePh")}  value={d.lastName}  onChange={e => set("lastName",  e.target.value)} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Input label={t("cp.s1.dob")} required type="date" value={d.dob} onChange={e => set("dob", e.target.value)} />
//         <Select label={t("cp.s1.gender")} required value={d.gender} onChange={e => set("gender", e.target.value)}
//           options={genderOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s1.maritalStatus")} required value={d.maritalStatus} onChange={e => set("maritalStatus", e.target.value)}
//           options={maritalOptions} />
//         <Select label={t("cp.s1.profileFor")} required value={d.profileFor} onChange={e => set("profileFor", e.target.value)}
//           options={profileForOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5">
//         <Input label={t("cp.s1.height")} placeholder={t("cp.s1.heightPh")} value={d.height} onChange={e => set("height", e.target.value)} />
//         <Input label={t("cp.s1.weight")} placeholder={t("cp.s1.weightPh")} value={d.weight} onChange={e => set("weight", e.target.value)} />
//         <Select label={t("cp.s1.bodyType")} value={d.bodyType} onChange={e => set("bodyType", e.target.value)}
//           options={bodyTypeOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s1.complexion")} value={d.complexion} onChange={e => set("complexion", e.target.value)}
//           options={complexionOptions} />
//         <Input label={t("cp.s1.mobile")} required type="tel" placeholder={t("cp.s1.mobilePh")} value={d.mobile} onChange={e => set("mobile", e.target.value)} />
//       </div>
//       <Textarea label={t("cp.s1.about")} required placeholder={t("cp.s1.aboutPh")} value={d.about} onChange={e => set("about", e.target.value)} rows={4} />
//     </div>
//   );
// }

// function Step2({ d, set, t }) {
//   const countryData = LOCATION_DATA[d.country] || { states: [], cities: {} };
//   const stateList   = countryData.states || [];
//   const cityList    = d.currentState ? (countryData.cities[d.currentState] || []) : [];

//   const motherTongueOptions = t("cp.options.motherTongue", { returnObjects: true });
//   const nationalityOptions  = t("cp.options.nationality",  { returnObjects: true });
//   const countryOptions      = t("cp.options.country",      { returnObjects: true });
//   const rashiOptions        = t("cp.options.rashi",        { returnObjects: true });
//   const nakshatraOptions    = t("cp.options.nakshatra",    { returnObjects: true });
//   const manglikOptions      = t("cp.options.manglik",      { returnObjects: true });

//   const handleCountryChange = e => {
//     set("country",      e.target.value);
//     set("currentState", "");
//     set("currentCity",  "");
//   };

//   const handleStateChange = e => {
//     set("currentState", e.target.value);
//     set("currentCity",  "");
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s2.motherTongue")} required value={d.motherTongue} onChange={e => set("motherTongue", e.target.value)}
//           options={motherTongueOptions} />
//         <Select label={t("cp.s2.nationality")} value={d.nationality} onChange={e => set("nationality", e.target.value)}
//           options={nationalityOptions} />
//       </div>
//       <Select label={t("cp.s2.country")} value={d.country} onChange={handleCountryChange}
//         options={countryOptions} />
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         {stateList.length > 0 ? (
//           <Select label={t("cp.s2.currentState")} value={d.currentState} onChange={handleStateChange}
//             options={stateList} placeholder="Select state…" />
//         ) : (
//           <Input label={t("cp.s2.currentState")} placeholder={t("cp.s2.currentStatePh")}
//             value={d.currentState} onChange={e => set("currentState", e.target.value)} />
//         )}
//         {cityList.length > 0 ? (
//           <Select label={t("cp.s2.currentCity")} required value={d.currentCity}
//             onChange={e => set("currentCity", e.target.value)}
//             options={cityList} placeholder="Select city…" />
//         ) : (
//           <Input label={t("cp.s2.currentCity")} required placeholder={t("cp.s2.currentCityPh")}
//             value={d.currentCity} onChange={e => set("currentCity", e.target.value)} />
//         )}
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Input label={t("cp.s2.birthCity")} placeholder={t("cp.s2.birthCityPh")} value={d.birthCity} onChange={e => set("birthCity", e.target.value)} />
//         <Input label={t("cp.s2.birthTime")} type="time" value={d.birthTime} onChange={e => set("birthTime", e.target.value)} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s2.rashi")} value={d.rashi} onChange={e => set("rashi", e.target.value)}
//           options={rashiOptions} />
//         <Select label={t("cp.s2.nakshatra")} value={d.nakshatra} onChange={e => set("nakshatra", e.target.value)}
//           options={nakshatraOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Input label={t("cp.s2.gotra")} placeholder={t("cp.s2.gotraPh")} value={d.gotra} onChange={e => set("gotra", e.target.value)} />
//         <Select label={t("cp.s2.manglik")} value={d.manglik} onChange={e => set("manglik", e.target.value)}
//           options={manglikOptions} />
//       </div>
//     </div>
//   );
// }

// function Step3({ d, set, t }) {
//   const religionOptions           = t("cp.options.religion",   { returnObjects: true });
//   const casteNoBarOptions         = t("cp.options.casteNoBar", { returnObjects: true });
//   const casteOptions = t("cp.options.caste", { returnObjects: true });
//   const religiousPracticeOptions = t("cp.options.religiousPractice", { returnObjects: true });

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s3.religion")} required value={d.religion} onChange={e => set("religion", e.target.value)}
//           options={religionOptions} />
//         <Select label={t("cp.s3.caste")} value={d.caste} onChange={e => set("caste", e.target.value)}
//           options={casteOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Input label={t("cp.s3.subCaste")} placeholder={t("cp.s3.subCastePh")} value={d.subCaste} onChange={e => set("subCaste", e.target.value)} />
//         <Select label={t("cp.s3.casteNoBar")} value={d.casteNoBar} onChange={e => set("casteNoBar", e.target.value)}
//           options={casteNoBarOptions} />
//       </div>
//       <Select label={t("cp.s3.religiousPractice")} value={d.religiousPractice} onChange={e => set("religiousPractice", e.target.value)}
//              options={religiousPracticeOptions}/>
//       <Input label={t("cp.s3.community")} placeholder={t("cp.s3.communityPh")} value={d.community} onChange={e => set("community", e.target.value)} />
//     </div>
//   );
// }

// function Step4({ d, set, t }) {
//   const familyTypeOptions   = t("cp.options.familyType",   { returnObjects: true });
//   const familyValuesOptions = t("cp.options.familyValues", { returnObjects: true });
//   const familyStatusOptions = t("cp.options.familyStatus", { returnObjects: true });
//   const fatherOccupationOptions = t("cp.options.fatherOccupation", { returnObjects: true });
//   const motherOccupationOptions = t("cp.options.motherOccupation", { returnObjects: true });
//   const siblingsOptions         = t("cp.options.siblingsCount", { returnObjects: true });

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Input label={t("cp.s4.fatherName")} placeholder={t("cp.s4.fatherNamePh")} value={d.fatherName} onChange={e => set("fatherName", e.target.value)} />
//         <Select label={t("cp.s4.fatherOccupation")} value={d.fatherOccupation} onChange={e => set("fatherOccupation", e.target.value)}
//           options={fatherOccupationOptions}/>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Input label={t("cp.s4.motherName")} placeholder={t("cp.s4.motherNamePh")} value={d.motherName} onChange={e => set("motherName", e.target.value)} />
//         <Select label={t("cp.s4.motherOccupation")} value={d.motherOccupation} onChange={e => set("motherOccupation", e.target.value)}
//           options={motherOccupationOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s4.brothers")} value={d.brothers} onChange={e => set("brothers", e.target.value)}
//           options={siblingsOptions} />
//         <Select label={t("cp.s4.brothersMarried")} value={d.brothersMarried} onChange={e => set("brothersMarried", e.target.value)}
//           options={siblingsOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s4.sisters")} value={d.sisters} onChange={e => set("sisters", e.target.value)}
//           options={siblingsOptions} />
//         <Select label={t("cp.s4.sistersMarried")} value={d.sistersMarried} onChange={e => set("sistersMarried", e.target.value)}
//           options={siblingsOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5">
//         <Select label={t("cp.s4.familyType")} value={d.familyType} onChange={e => set("familyType", e.target.value)}
//           options={familyTypeOptions} />
//         <Select label={t("cp.s4.familyValues")} value={d.familyValues} onChange={e => set("familyValues", e.target.value)}
//           options={familyValuesOptions} />
//         <Select label={t("cp.s4.familyStatus")} value={d.familyStatus} onChange={e => set("familyStatus", e.target.value)}
//           options={familyStatusOptions} />
//       </div>
//       <Input label={t("cp.s4.familyLocation")} placeholder={t("cp.s4.familyLocationPh")} value={d.familyLocation} onChange={e => set("familyLocation", e.target.value)} />
//     </div>
//   );
// }

// function Step5({ d, set, t }) {
//   const educationOptions      = t("cp.options.education",      { returnObjects: true });
//   const employmentTypeOptions = t("cp.options.employmentType", { returnObjects: true });
//   const incomeOptions         = t("cp.options.income",         { returnObjects: true });

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s5.education")} required value={d.education} onChange={e => set("education", e.target.value)}
//           options={educationOptions} />
//         <Input label={t("cp.s5.fieldOfStudy")} placeholder={t("cp.s5.collegePh")} value={d.fieldOfStudy} onChange={e => set("fieldOfStudy", e.target.value)} />
//       </div>
//       <Input label={t("cp.s5.college")} placeholder={t("cp.s5.fieldOfStudyPh")} value={d.college} onChange={e => set("college", e.target.value)} />
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s5.employmentType")} required value={d.employmentType} onChange={e => set("employmentType", e.target.value)}
//           options={employmentTypeOptions} />
//         <Input label={t("cp.s5.occupation")} required placeholder={t("cp.s5.occupationPh")} value={d.occupation} onChange={e => set("occupation", e.target.value)} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Input label={t("cp.s5.company")} placeholder={t("cp.s5.companyPh")} value={d.company} onChange={e => set("company", e.target.value)} />
//         <Select label={t("cp.s5.income")} value={d.income} onChange={e => set("income", e.target.value)}
//           options={incomeOptions} />
//       </div>
//       <Input label={t("cp.s5.workLocation")} placeholder={t("cp.s5.workLocationPh")} value={d.workLocation} onChange={e => set("workLocation", e.target.value)} />
//     </div>
//   );
// }

// function Step6({ d, set, toggleChip, t }) {
//   const dietOptions    = t("cp.options.diet",     { returnObjects: true });
//   const smokingOptions = t("cp.options.smoking",  { returnObjects: true });
//   const drinkingOptions= t("cp.options.drinking", { returnObjects: true });
//   const fitnessOptions = t("cp.options.fitness",  { returnObjects: true });
//   const vehicleOptions = t("cp.options.vehicle",  { returnObjects: true });
//   const propertyOptions= t("cp.options.property", { returnObjects: true });
//   const languages      = t("cp.options.languages", { returnObjects: true });
//   const hobbies        = t("cp.options.hobbies",   { returnObjects: true });

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s6.diet")} required value={d.diet} onChange={e => set("diet", e.target.value)}
//           options={dietOptions} />
//         <Select label={t("cp.s6.smoking")} value={d.smoking} onChange={e => set("smoking", e.target.value)}
//           options={smokingOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s6.drinking")} value={d.drinking} onChange={e => set("drinking", e.target.value)}
//           options={drinkingOptions} />
//         <Select label={t("cp.s6.fitness")} value={d.fitness} onChange={e => set("fitness", e.target.value)}
//           options={fitnessOptions} />
//       </div>
//       <Chips label={t("cp.s6.languages")} options={languages} selected={d.languages} onToggle={v => toggleChip("languages", v)} />
//       <Chips label={t("cp.s6.hobbies")} options={hobbies} selected={d.hobbies} onToggle={v => toggleChip("hobbies", v)} />
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s6.vehicle")} value={d.vehicle} onChange={e => set("vehicle", e.target.value)}
//           options={vehicleOptions} />
//         <Select label={t("cp.s6.property")} value={d.property} onChange={e => set("property", e.target.value)}
//           options={propertyOptions} />
//       </div>
//     </div>
//   );
// }

// function Step7({ d, set, t }) {
//   const { i18n } = useTranslation();
//   const partnerMaritalStatusOptions = t("cp.options.partnerMaritalStatus", { returnObjects: true });
//   const partnerReligionOptions      = t("cp.options.partnerReligion",      { returnObjects: true });
//   const partnerCasteOptions         = t("cp.options.partnerCaste",         { returnObjects: true });
//   const partnerEducationOptions     = t("cp.options.partnerEducation",     { returnObjects: true });
//   const partnerIncomeOptions        = t("cp.options.partnerIncome",        { returnObjects: true });
//   const partnerLocationOptions      = t("cp.options.partnerLocation",      { returnObjects: true });
//   const partnerDietOptions          = t("cp.options.partnerDiet",          { returnObjects: true });
//   const partnerManglikOptions       = t("cp.options.partnerManglik",       { returnObjects: true });

//   const toMarathiNumber = (num) => {
//   const marathiDigits = ["०","१","२","३","४","५","६","७","८","९"];
//   return num.toString().replace(/\d/g, d => marathiDigits[d]);
// };

// const yearLabel = t("common.years");
// const isMarathi = i18n.language === "mr";

// const ageOptions = Array.from({ length: 33 }, (_, i) => {
//   const age = 18 + i;
//   const displayAge = isMarathi ? toMarathiNumber(age) : age;
//   return `${displayAge} ${yearLabel}`;
// });

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//       <Select label={t("cp.s7.partnerAgeMin")}value={d.partnerAgeMin} onChange={e => set("partnerAgeMin", e.target.value)} options={ageOptions}/>         
//       <Select label={t("cp.s7.partnerAgeMax")} value={d.partnerAgeMax} onChange={e => set("partnerAgeMax", e.target.value)} options={ageOptions}/>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Input label={t("cp.s7.partnerHeightMin")} placeholder={t("cp.s7.partnerHeightMinPh")} value={d.partnerHeightMin} onChange={e => set("partnerHeightMin", e.target.value)} />
//         <Input label={t("cp.s7.partnerHeightMax")} placeholder={t("cp.s7.partnerHeightMaxPh")} value={d.partnerHeightMax} onChange={e => set("partnerHeightMax", e.target.value)} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s7.partnerMaritalStatus")} value={d.partnerMaritalStatus} onChange={e => set("partnerMaritalStatus", e.target.value)}
//           options={partnerMaritalStatusOptions} />
//         <Select label={t("cp.s7.partnerReligion")} value={d.partnerReligion} onChange={e => set("partnerReligion", e.target.value)}
//           options={partnerReligionOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s7.partnerCaste")} value={d.partnerCaste} onChange={e => set("partnerCaste", e.target.value)}
//           options={partnerCasteOptions} />
//         <Select label={t("cp.s7.partnerEducation")} value={d.partnerEducation} onChange={e => set("partnerEducation", e.target.value)}
//           options={partnerEducationOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s7.partnerIncome")} value={d.partnerIncome} onChange={e => set("partnerIncome", e.target.value)}
//           options={partnerIncomeOptions} />
//         <Select label={t("cp.s7.partnerLocation")} value={d.partnerLocation} onChange={e => set("partnerLocation", e.target.value)}
//           options={partnerLocationOptions} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
//         <Select label={t("cp.s7.partnerDiet")} value={d.partnerDiet} onChange={e => set("partnerDiet", e.target.value)}
//           options={partnerDietOptions} />
//         <Select label={t("cp.s7.partnerManglik")} value={d.partnerManglik} onChange={e => set("partnerManglik", e.target.value)}
//           options={partnerManglikOptions} />
//       </div>
//       <Textarea label={t("cp.s7.partnerDesc")} placeholder={t("cp.s7.partnerDescPh")} value={d.partnerDesc} onChange={e => set("partnerDesc", e.target.value)} rows={4} />
//     </div>
//   );
// }

// function Step8({ d, set, t }) {
//   const [verifying, setVerifying] = useState(false);
//   const [selectedDoc, setSelectedDoc] = useState(null);


//   const handlePhoto = e => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     set("photos", [url]);
//   };
//   const photo = d.photos && d.photos[0];

//   const handleIdDoc = e => {
//     const file = e.target.files[0];
//     if (!file) return;
//     set("idDoc", file.name);
//     set("verified", false);
//     setVerifying(true);
//     setTimeout(() => {
//       setVerifying(false);
//       set("verified", true);
//     }, 2500);
//   };

//   const docTypes = [
//   {
//     icon: "🪪",
//     label: t("cp.s8.documents.aadhaar"),
//     hint: t("cp.s8.documents.aadhaarHint"),
//   },
//   {
//     icon: "💳",
//     label: t("cp.s8.documents.pan"),
//     hint: t("cp.s8.documents.panHint"),
//   },
//   {
//     icon: "📕",
//     label: t("cp.s8.documents.passport"),
//     hint: t("cp.s8.documents.passportHint"),
//   },
//   {
//     icon: "🚗",
//     label: t("cp.s8.documents.dl"),
//     hint: t("cp.s8.documents.dlHint"),
//   },
// ];

//   return (
//     <div>
//       {/* ── PROFILE PHOTO ── */}
//       <div className="mb-7">
//         <Label>{t("cp.s8.profilePhoto")}</Label>
//         <p className="text-[0.78rem] text-[#9a8c7a] mb-4">
//           {t("cp.s8.photoDesc")}
//         </p>
//         <div className="flex flex-col items-center gap-4">
//           {photo ? (
//             <div className="relative">
//               <img src={photo} alt="Profile"
//                 className="w-32 h-32 rounded-2xl object-cover border-2 border-[#e8c98a] shadow-md" />
//               <button type="button" onClick={() => set("photos", [])}
//                 className="absolute -top-2 -right-2 w-6 h-6 bg-stone-800 text-white text-xs rounded-full flex items-center justify-center cursor-pointer border-2 border-white hover:bg-red-500 transition-colors">
//                 ×
//               </button>
//               {d.verified && (
//                 <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#4a7a4a] rounded-full flex items-center justify-center border-2 border-white text-white text-xs font-bold">
//                   ✓
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-[#f0ddb8] bg-[#fdf6ec] flex flex-col items-center justify-center">
//               <span className="text-4xl mb-1">👤</span>
//               <span className="text-[0.65rem] text-[#9a8c7a]">No photo yet</span>
//             </div>
//           )}
//           <label className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#e8c98a] bg-[#fdf6ec] text-[#c2852a] text-[0.8rem] font-semibold cursor-pointer hover:bg-[#f5e8cc] transition-colors">
//             <span>{photo ? t("cp.s8.changePhoto") : t("cp.s8.uploadPhoto")}</span>
//             <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
//           </label>
//         </div>
//       </div>

//       <div className="border-t border-[#f0ede9] my-5" />

//       {/* ── ID VERIFICATION ── */}
// <div>
//   <div className="flex items-center gap-2 mb-1">
//     <Label>{t("cp.s8.idVerification")}</Label>
//     {d.verified && (
//       <span className="inline-flex items-center gap-1 text-[0.68rem] font-bold px-2 py-0.5 rounded-full mb-1.5"
//         style={{ background: "#eaf4ea", color: "#4a7a4a" }}>
//         ✓ {t("cp.s8.verified")}
//       </span>
//     )}
//   </div>

//   <p className="text-[0.78rem] text-[#9a8c7a] mb-4">
//     {t("cp.s8.idDesc")}
//   </p>

//   {/* DOCUMENT TYPES */}
//   <div className="grid grid-cols-2 gap-2 mb-4">
//     {docTypes.map(dt => (
//       <div
//         key={dt.label}
//         onClick={() => setSelectedDoc(dt.label)}
//         className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all
//           ${selectedDoc === dt.label
//             ? "border-[#c2852a] bg-[#fdf6ec]"
//             : "border-[#ece8e1] bg-[#fdfcfa]"
//           }`}
//       >
//         <span className="text-lg">{dt.icon}</span>
//         <div>
//           <div className="text-[0.75rem] font-semibold text-[#1c1917]">
//             {dt.label}
//           </div>
//           <div className="text-[0.65rem] text-[#9a8c7a]">
//             {dt.hint}
//           </div>
//         </div>

//         {/* ✔ Tick */}
//         {selectedDoc === dt.label && (
//           <span className="ml-auto text-[#c2852a] text-sm">✓</span>
//         )}
//       </div>
//     ))}
//   </div>

//   {/* UPLOAD */}
//   {!d.idDoc ? (
//     selectedDoc ? (
//       <label className="flex items-center gap-4 border-2 border-dashed border-[#f0ddb8] rounded-xl p-4 cursor-pointer hover:border-[#c2852a] hover:bg-[#fdf9f3] transition-all">
//         <div className="w-10 h-10 rounded-xl bg-[#fdf6ec] flex items-center justify-center text-xl flex-shrink-0">
//           📄
//         </div>

//         <div className="flex-1">
//           <div className="text-[0.83rem] font-semibold text-[#1c1917]">
//             {t("cp.s8.uploadTitle")}
//           </div>
//           <div className="text-[0.72rem] text-[#9a8c7a]">
//             {t("cp.s8.uploadHint")}
//           </div>
//         </div>

//         <div className="flex-shrink-0 text-[0.75rem] font-semibold text-[#c2852a] border border-[#f0ddb8] bg-[#fdf6ec] px-3 py-1.5 rounded-lg">
//           {t("cp.s8.browse")}
//         </div>

//         <input
//           type="file"
//           accept="image/*,.pdf"
//           className="hidden"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             if (!file) return;

//             set("idDoc", file.name);
//             set("docType", selectedDoc); 
//             set("verified", false);

//             setVerifying(true);
//             setTimeout(() => {
//               setVerifying(false);
//               set("verified", true);
//             }, 2500);
//           }}
//         />
//       </label>
//     ) : (
//       <div className="text-center text-[0.72rem] text-[#9a8c7a] py-3">
//         👉 {t("cp.s8.selectDoc")}
//       </div>
//     )
//   ) : (
//     <div className="rounded-xl border overflow-hidden"
//       style={{ borderColor: d.verified ? "#b8d8b8" : "#f0ddb8" }}>

//       <div className="flex items-center gap-3 px-4 py-3"
//         style={{ background: d.verified ? "#f0f8f0" : "#fdf6ec" }}>

//         <span className="text-xl">📄</span>

//         <div className="flex-1 min-w-0">
//           <div className="text-[0.8rem] font-semibold text-[#1c1917] truncate">
//             {d.idDoc}
//           </div>

//           <div className="text-[0.68rem] text-[#9a8c7a]">
//             {d.docType} • Document uploaded
//           </div>
//         </div>

//         {verifying ? (
//           <div className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#c2852a]">
//             <span className="inline-block w-3.5 h-3.5 border-2 border-[#c2852a] border-t-transparent rounded-full animate-spin" />
//             {t("cp.s8.verifying")}
//           </div>
//         ) : d.verified ? (
//           <div className="flex items-center gap-1 text-[0.72rem] font-bold text-[#4a7a4a]">
//             <span className="w-5 h-5 bg-[#4a7a4a] rounded-full flex items-center justify-center text-white text-[0.6rem]">
//               ✓
//             </span>
//             {t("cp.s8.verified")}
//           </div>
//         ) : null}

//         <button
//           type="button"
//           onClick={() => {
//             set("idDoc", "");
//             set("verified", false);
//             setSelectedDoc(null); 
//           }}
//           className="text-[#9a8c7a] hover:text-red-500 text-lg"
//         >
//           ×
//         </button>
//       </div>

//       {d.verified && (
//         <div className="px-4 py-2.5 flex items-center gap-2"
//           style={{ background: "#eaf4ea" }}>
//           <span className="text-base">🎉</span>
//           <p className="text-[0.75rem] font-semibold text-[#4a7a4a]">
//             {t("cp.s8.verifiedMsg")}
//           </p>
//         </div>
//       )}
//     </div>
//   )}

//   <p className="text-[0.68rem] text-[#b0a090] mt-3 flex items-center gap-1">
//     {t("cp.s8.privacyNote")}
//   </p>
// </div>
//     </div>
//   );
// }

// /* ─── initial data ───────────────────────────────────────────── */
// const initData = {
//   firstName: "", lastName: "", dob: "", gender: "", maritalStatus: "", profileFor: "",
//   height: "", weight: "", bodyType: "", complexion: "", mobile: "", about: "",
//   motherTongue: "", nationality: "", currentCity: "", currentState: "", country: "",
//   birthCity: "", birthTime: "", rashi: "", nakshatra: "", gotra: "", manglik: "",
//   religion: "", caste: "", subCaste: "", casteNoBar: "", religiousPractice: "", community: "",
//   fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "",
//   brothers: "", brothersMarried: "", sisters: "", sistersMarried: "",
//   familyType: "", familyValues: "", familyStatus: "", familyLocation: "",
//   education: "", fieldOfStudy: "", college: "",
//   employmentType: "", occupation: "", company: "", income: "", workLocation: "",
//   diet: "", smoking: "", drinking: "", fitness: "",
//   languages: [], hobbies: [], vehicle: "", property: "",
//   partnerAgeMin: "", partnerAgeMax: "",
//   partnerHeightMin: "", partnerHeightMax: "",
//   partnerMaritalStatus: "", partnerReligion: "", partnerCaste: "",
//   partnerEducation: "", partnerIncome: "", partnerLocation: "",
//   partnerDiet: "", partnerManglik: "", partnerDesc: "",
//   photos: [], idDoc: "", verified: false,
// };

// /* ─── main page ──────────────────────────────────────────────── */
// export default function CompleteProfile({ onClose }) {
//   const navigate        = useNavigate();
//   const { saveProfile } = useProfile();
//   const { t }           = useTranslation();
//   const [step,  setStep]  = useState(1);
//   const [data,  setData]  = useState(initData);
//   const [toast, setToast] = useState(false);
//   const scrollRef = useRef(null);


//   const steps = STEPS(t);

//   const set = (key, val) => setData(d => ({ ...d, [key]: val }));

//   const toggleChip = (key, val) =>
//     setData(d => ({
//       ...d,
//       [key]: d[key].includes(val) ? d[key].filter(x => x !== val) : [...d[key], val],
//     }));

//   const pct  = Math.round(((step - 1) / steps.length) * 100);
//  const scrollToTop = () => {
//   if (scrollRef.current) {
//     scrollRef.current.scrollTo({
//       top: 0,
//       behavior: "smooth", // smooth scroll (nice UX)
//     });
//   }
// };

// const next = () => {
//   if (step < steps.length) {
//     setStep(s => s + 1);
//     scrollToTop();
//   }
// };

// const prev = () => {
//   if (step > 1) {
//     setStep(s => s - 1);
//     scrollToTop();
//   }
// };

//   const save = () => {
//     saveProfile(data);
//     setToast(true);
//     setTimeout(() => {
//       setToast(false);
//       if (onClose) onClose();
//       else navigate("/profile");
//     }, 2000);
//   };

//   const handleKeyDown = (e) => { if (e.key === "Escape" && onClose) onClose(); };

//   const stepInfo = [
//     t("cp.stepInfo.1"),
//     t("cp.stepInfo.2"),
//     t("cp.stepInfo.3"),
//     t("cp.stepInfo.4"),
//     t("cp.stepInfo.5"),
//     t("cp.stepInfo.6"),
//     t("cp.stepInfo.7"),
//     t("cp.stepInfo.8"),
//   ];

//   const card = (
//     <div
//       className="w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col"
//       style={{
//         background: "white",
//         boxShadow: "0 8px 48px rgba(28,25,23,0.18)",
//         border: "1px solid #ece8e1",
//         maxHeight: "90vh",
//       }}
//     >
//       {/* ══ CARD HEADER ══ */}
//       <div style={{ background: DARK }}>
//         <div className="px-6 pt-5 pb-3 flex items-center justify-between">
//           <div>
//             <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase mb-0.5" style={{ color: "#c2852a" }}>
//               {t("cp.header.tag")}
//             </p>
//             <h1 className="text-[1.25rem] font-bold text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//               {t("cp.header.title")}
//             </h1>
//           </div>
//           <div className="flex items-center gap-2 flex-shrink-0">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.72rem] font-bold"
//               style={{ background: "rgba(194,133,42,0.18)", color: "#e8c98a" }}>
//               <span>{steps[step-1].icon}</span>
//               <span>{t("cp.header.stepOf", { step, total: steps.length })}</span>
//             </div>
//             {onClose && (
//               <button onClick={onClose}
//                 className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer border-none text-lg leading-none"
//                 style={{ background: "transparent" }}
//                 aria-label="Close">
//                 ×
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className="px-6 pb-2">
//           <div className="flex items-center justify-between mb-1.5">
//             <span className="text-[0.68rem] text-white/50">{steps[step-1].label}</span>
//             <span className="text-[0.68rem] font-bold" style={{ color: "#e8c98a" }}>{pct}%</span>
//           </div>
//           <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
//             <div className="h-full rounded-full transition-all duration-500"
//               style={{ width: `${pct}%`, background: "linear-gradient(90deg, #c2852a, #e8c98a)" }} />
//           </div>
//         </div>

//         {/* Step pills */}
//         <div className="flex gap-1.5 px-6 pb-4 mt-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
//           {steps.map(s => {
//             const done = s.id < step, current = s.id === step;
//             return (
//               <button key={s.id} onClick={() => setStep(s.id)}
//                 className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold border transition-all cursor-pointer"
//                 style={{
//                   background:  current ? ACCENT : done ? "rgba(194,133,42,0.15)" : "rgba(255,255,255,0.07)",
//                   color:       current ? "white" : done ? "#e8c98a"               : "rgba(255,255,255,0.45)",
//                   borderColor: current ? ACCENT  : done ? "rgba(194,133,42,0.3)"  : "rgba(255,255,255,0.1)",
//                 }}>
//                 <span className="text-[0.7rem]">{done ? "✓" : s.icon}</span>
//                 <span className="hidden sm:inline">{s.label}</span>
//                 <span className="sm:hidden">{s.id}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* ══ CARD BODY ══ */}
//       <div ref={scrollRef} className="overflow-y-auto flex-1">
//         <div className="px-6 py-5">
//           <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#f0ede9]">
//             <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
//               style={{ background: "#fdf6ec", border: "1px solid #f0ddb8" }}>
//               {steps[step - 1].icon}
//             </div>
//             <div>
//               <h2 className="text-[1.05rem] font-bold text-[#1c1917]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//                 {steps[step - 1].label}
//               </h2>
//               <p className="text-[0.7rem] text-[#9a8c7a]">{stepInfo[step - 1]}</p>
//             </div>
//           </div>
//           {step === 1 && <Step1 d={data} set={set} t={t} />}
//           {step === 2 && <Step2 d={data} set={set} t={t} />}
//           {step === 3 && <Step3 d={data} set={set} t={t} />}
//           {step === 4 && <Step4 d={data} set={set} t={t} />}
//           {step === 5 && <Step5 d={data} set={set} t={t} />}
//           {step === 6 && <Step6 d={data} set={set} toggleChip={toggleChip} t={t} />}
//           {step === 7 && <Step7 d={data} set={set} t={t} />}
//           {step === 8 && <Step8 d={data} set={set} t={t} />}
//         </div>
//       </div>

//       {/* ══ CARD FOOTER ══ */}
//       <div className="px-6 py-4 flex items-center justify-between gap-3 flex-shrink-0"
//         style={{ borderTop: "1px solid #ece8e1", background: "#fdfcfa" }}>
//         <button onClick={prev} disabled={step === 1}
//           className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[0.82rem] font-medium transition-all cursor-pointer border"
//           style={{ background: "white", color: "#4a3f35", borderColor: "#ece8e1", opacity: step === 1 ? 0.3 : 1 }}
//           onMouseEnter={e => { if (step > 1) e.currentTarget.style.borderColor = ACCENT; }}
//           onMouseLeave={e => { e.currentTarget.style.borderColor = "#ece8e1"; }}>
//           {t("cp.footer.back")}
//         </button>

//         <div className="flex items-center gap-1.5">
//           {steps.map(s => (
//             <div key={s.id} onClick={() => setStep(s.id)} className="rounded-full transition-all duration-300 cursor-pointer"
//               style={{ width: s.id === step ? 20 : 6, height: 6,
//                 background: s.id === step ? ACCENT : s.id < step ? "#e8c98a" : "#ece8e1" }} />
//           ))}
//         </div>

//         {step < steps.length ? (
//           <button onClick={next}
//             className="px-6 py-2.5 rounded-xl text-white text-[0.82rem] font-semibold cursor-pointer border-none"
//             style={{ background: ACCENT, boxShadow: "0 2px 12px rgba(194,133,42,0.3)" }}
//             onMouseEnter={e => e.currentTarget.style.background = "#a8701f"}
//             onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
//             {t("cp.footer.next")}
//           </button>
//         ) : (
//           <button onClick={save}
//             className="px-6 py-2.5 rounded-xl text-white text-[0.82rem] font-semibold cursor-pointer border-none"
//             style={{ background: "#4a7a4a", boxShadow: "0 2px 12px rgba(74,122,74,0.3)" }}
//             onMouseEnter={e => e.currentTarget.style.background = "#3a6a3a"}
//             onMouseLeave={e => e.currentTarget.style.background = "#4a7a4a"}>
//             {t("cp.footer.save")}
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   /* ── Success toast component ── */
//   const successToast = (
//     <>
//       <style>{`
//         @keyframes popIn { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
//         @keyframes drawCircle { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
//         @keyframes drawTick   { from { stroke-dashoffset: 60;  } to { stroke-dashoffset: 0; } }
//       `}</style>
//       <div className="w-full max-w-sm rounded-3xl flex flex-col items-center text-center px-8 py-10 bg-white border border-[#ece8e1] shadow-2xl"
//         style={{ animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
//         <div className="mb-5">
//           <svg width="88" height="88" viewBox="0 0 96 96">
//             <circle cx="48" cy="48" r="44" fill="#fdf6ec" stroke="#f0ddb8" strokeWidth="2" />
//             <circle cx="48" cy="48" r="38" fill="none" stroke="#c2852a" strokeWidth="3.5"
//               strokeLinecap="round" strokeDasharray="200" strokeDashoffset="0"
//               style={{ animation: "drawCircle 0.6s ease forwards", transformOrigin: "center", transform: "rotate(-90deg)" }} />
//             <polyline points="30,50 43,63 66,36" fill="none" stroke="#c2852a"
//               strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
//               strokeDasharray="60" strokeDashoffset="0"
//               style={{ animation: "drawTick 0.4s 0.5s ease both" }} />
//           </svg>
//         </div>
//         <span className="text-[0.62rem] font-bold tracking-widest uppercase text-[#c2852a] mb-2">
//           {t("cp.toast.tag")}
//         </span>
//         <h2 className="text-[1.6rem] font-bold text-[#1c1917] mb-1.5"
//           style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//           {t("cp.toast.title")}
//         </h2>
//         <p className="text-[#9a8c7a] text-[0.83rem] mb-5">
//           {t("cp.toast.subtitle")}
//         </p>
//         <div className="w-10 h-px bg-[#f0ddb8] mb-5" />
//         <div className="flex items-center gap-5">
//           <div className="text-center">
//             <p className="text-[1.2rem] font-bold text-[#1c1917]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>8×</p>
//             <p className="text-[0.62rem] text-[#9a8c7a] uppercase tracking-wide mt-0.5">{t("cp.toast.responses")}</p>
//           </div>
//           <div className="w-px h-8 bg-[#f0ddb8]" />
//           <div className="text-center">
//             <p className="text-[1.2rem] font-bold text-[#1c1917]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>100%</p>
//             <p className="text-[0.62rem] text-[#9a8c7a] uppercase tracking-wide mt-0.5">{t("cp.toast.complete")}</p>
//           </div>
//           <div className="w-px h-8 bg-[#f0ddb8]" />
//           <div className="text-center">
//             <p className="text-[1.2rem] font-bold text-[#4a7a4a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>✓</p>
//             <p className="text-[0.62rem] text-[#9a8c7a] uppercase tracking-wide mt-0.5">{t("cp.toast.verified")}</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );

//   /* ── When used as modal overlay ── */
//   if (onClose) {
//     return (
//       <>
//         <style>{`body { overflow: hidden; }`}</style>
//         {toast && (
//           <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-stone-950/70 backdrop-blur-sm">
//             {successToast}
//           </div>
//         )}
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
//           style={{ background: "rgba(28,25,23,0.65)", backdropFilter: "blur(4px)" }}
//           onKeyDown={handleKeyDown}
//         >
//           <div className="absolute inset-0" onClick={onClose} />
//           <div className="relative z-10 w-full max-w-2xl">
//             {card}
//           </div>
//         </div>

        
//       </>
//     );
//   }

//   /* ── When used as standalone page (fallback) ── */
//   return (
//     <div className="min-h-screen flex items-start justify-center py-10 pt-20 px-4 pb-16"
//       style={{ background: "#f9f7f4", fontFamily: "'Inter', sans-serif" }}>
//       <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
//       {toast && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-sm">
//           {successToast}
//         </div>
//       )}
//       {card}
//     </div>

    

//   );
// }


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { useTranslation } from "react-i18next";
import { locationData } from "../data/locationData";



/* ─── constants ──────────────────────────────────────────────── */
const ACCENT  = "#c2852a";
const DARK    = "#1c1917";
const BORDER  = "#ece8e1";
const MUTED   = "#9a8c7a";

const STEPS = (t) => [
  { id: 1, label: t("cp.steps.basic"),     icon: "👤" },
  { id: 2, label: t("cp.steps.personal"),  icon: "🏠" },
  { id: 3, label: t("cp.steps.family"),    icon: "👨‍👩‍👧" },
  { id: 4, label: t("cp.steps.education"), icon: "🎓" },
  { id: 5, label: t("cp.steps.lifestyle"), icon: "🌿" },
  { id: 6, label: t("cp.steps.partner"),   icon: "💑" },
  { id: 7, label: t("cp.steps.photos"),    icon: "📸" },
];

/* ─── small shared primitives ────────────────────────────────── */
function Label({ children, required }) {
  return (
    <label className="block text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#9a8c7a] mb-1.5">
      {children}{required && <span className="text-[#c2852a] ml-0.5">*</span>}
    </label>
  );
}

function Input({ label, required, type = "text", placeholder, value, onChange, ...rest }) {
  const [focus, setFocus] = useState(false);
  return (
    <div className="mb-4">
      {label && <Label required={required}>{label}</Label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%", padding: "9px 13px",
          border: `1.5px solid ${focus ? ACCENT : BORDER}`,
          borderRadius: 9, fontFamily: "'Inter', sans-serif",
          fontSize: "0.83rem", color: DARK,
          outline: "none", transition: "border-color 0.18s",
          background: "white",
        }}
        {...rest}
      />
    </div>
  );
}

function Select({ label, required, value, onChange, options = [], placeholder, disabled }) {
  const [focus, setFocus] = useState(false);

  // Guard: if options is not an array (t() returned a key string), treat as empty
  const safeOptions = Array.isArray(options) ? options : [];

  const normalised = safeOptions.map(o =>
    typeof o === "string" ? { value: o, label: o } : o
  );

  return (
    <div className="mb-4">
      {label && <Label required={required}>{label}</Label>}
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={disabled}
        style={{
          width: "100%", padding: "9px 13px",
          border: `1.5px solid ${focus ? ACCENT : BORDER}`,
          borderRadius: 9, fontFamily: "'Inter', sans-serif",
          fontSize: "0.83rem", color: value ? DARK : MUTED,
          outline: "none", cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.18s", appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239a8c7a'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
          paddingRight: 30, background: "white",
        }}
      >
        <option value="">{placeholder || "Select…"}</option>
      {normalised.map(({ value: val, label: lbl, disabled: optDisabled }) => (
        <option key={val} value={val} disabled={optDisabled}>
          {lbl}
        </option>
      ))}
      </select>
    </div>
  );
}

function Textarea({ label, required, placeholder, value, onChange, rows = 3 }) {
  const [focus, setFocus] = useState(false);
  return (
    <div className="mb-4">
      {label && <Label required={required}>{label}</Label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%", padding: "9px 13px",
          border: `1.5px solid ${focus ? ACCENT : BORDER}`,
          borderRadius: 9, fontFamily: "'Inter', sans-serif",
          fontSize: "0.83rem", color: DARK,
          outline: "none", transition: "border-color 0.18s",
          resize: "vertical", background: "white",
        }}
      />
    </div>
  );
}

function Chips({ label, options, selected, onToggle }) {
  // Guard: if t() returned a key string instead of array, treat as empty
  const safeOptions = Array.isArray(options) ? options : [];
  const safeSelected = Array.isArray(selected) ? selected : [];

  return (
    <div className="mb-4">
      {label && <Label>{label}</Label>}
      <div className="flex flex-wrap gap-2">
        {safeOptions.map(o => {
          const active = safeSelected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              className="text-[0.78rem] px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer"
              style={{
                background:   active ? ACCENT : "white",
                color:        active ? "white" : MUTED,
                borderColor:  active ? ACCENT  : BORDER,
                fontFamily:   "'Inter', sans-serif",
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── step forms ─────────────────────────────────────────────── */

// ── HeightPicker ───────────────────────────────────────────────────────
function HeightPicker({ value, onChange, label, minValue }) {
  const feet   = value ? value.split("-")[0] : "";
  const inches = value ? value.split("-")[1] : "";

  const minFt  = minValue ? Number(minValue.split("-")[0]) : null;
  const minIn  = minValue ? Number(minValue.split("-")[1]) : null;

  // ── Auto-clear if current value is now invalid due to minValue change ──
  useEffect(() => {
    if (!minValue || !value) return;
    const [curFt, curIn] = value.split("-").map(Number);
    // If same feet and inches <= min inches → clear
    if (curFt === minFt && curIn <= minIn) {
      onChange("");
    }
    // If feet < min feet → clear
    if (curFt < minFt) {
      onChange("");
    }
  }, [minValue]);

  return (
    <div className="mb-4">
      {label && <Label>{label}</Label>}
      <div style={{ display: "flex", gap: 8 }}>
        <select
          value={feet}
          onChange={e => onChange(e.target.value ? `${e.target.value}-${inches || "0"}` : "")}
          style={{
            flex: 1, padding: "9px 13px",
            border: "1.5px solid #ece8e1",
            borderRadius: 9, fontFamily: "'Inter', sans-serif",
            fontSize: "0.83rem", color: feet ? "#1c1917" : "#9a8c7a",
            outline: "none", cursor: "pointer",
            appearance: "none", background: "white",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239a8c7a'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
            paddingRight: 30,
          }}
          onFocus={e => e.target.style.borderColor = "#c2852a"}
          onBlur={e => e.target.style.borderColor = "#ece8e1"}
        >
          <option value="">ft</option>
          {[4,5,6,7].map(f => (
            <option key={f} value={f} disabled={minFt !== null && f < minFt}>
              {f} ft
            </option>
          ))}
        </select>

        <select
          value={inches}
          onChange={e => onChange(`${feet || "5"}-${e.target.value}`)}
          disabled={!feet}
          style={{
            flex: 1, padding: "9px 13px",
            border: "1.5px solid #ece8e1",
            borderRadius: 9, fontFamily: "'Inter', sans-serif",
            fontSize: "0.83rem", color: inches !== "" ? "#1c1917" : "#9a8c7a",
            outline: "none", cursor: feet ? "pointer" : "not-allowed",
            opacity: feet ? 1 : 0.5,
            appearance: "none", background: "white",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239a8c7a'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
            paddingRight: 30,
          }}
          onFocus={e => e.target.style.borderColor = "#c2852a"}
          onBlur={e => e.target.style.borderColor = "#ece8e1"}
        >
          <option value="">in</option>
          {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
            <option
              key={i}
              value={i}
              disabled={minFt !== null && Number(feet) === minFt && i <= minIn}
            >
              {i} in
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ── Step1 ──────────────────────────────────────────────────────────────
function Step1({ d, set, t }) {
  const genderOptions     = t("cp.options.gender",        { returnObjects: true });
  const maritalOptions    = t("cp.options.maritalStatus", { returnObjects: true });
  const profileForOptions = t("cp.options.profileFor",    { returnObjects: true });
  const bodyTypeOptions   = t("cp.options.bodyType",      { returnObjects: true });
  const complexionOptions = t("cp.options.complexion",    { returnObjects: true });

  

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Input label={t("cp.s1.firstName")} required placeholder={t("cp.s1.firstNamePh")}
          value={d.firstName} onChange={e => set("firstName", e.target.value)} />
        <Input label={t("cp.s1.lastName")}  required placeholder={t("cp.s1.lastNamePh")}
          value={d.lastName}  onChange={e => set("lastName",  e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Input label={t("cp.s1.dob")} required type="date"
          value={d.dob} onChange={e => set("dob", e.target.value)} />
        <Select label={t("cp.s1.gender")} required
          value={d.gender} onChange={e => set("gender", e.target.value)}
          options={genderOptions} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select label={t("cp.s1.maritalStatus")} required
          value={d.maritalStatus} onChange={e => set("maritalStatus", e.target.value)}
          options={maritalOptions} />
        <Select label={t("cp.s1.profileFor")} required
          value={d.profileFor} onChange={e => set("profileFor", e.target.value)}
          options={profileForOptions} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5">

        {/* ── Height: custom scroll picker ── */}
        <HeightPicker
          label={t("cp.s1.height")}
          value={d.height}
          onChange={(val) => set("height", val)}
        />

        {/* Weight with kg suffix */}
<div className="mb-4">
  <Label>{t("cp.s1.weight")}</Label>
  <div style={{ position: "relative" }}>
    <input
      placeholder="80"
      value={d.weight}
      onChange={e => set("weight", e.target.value)}
      style={{
        width: "100%", padding: "9px 40px 9px 13px",
        border: "1.5px solid #ece8e1",
        borderRadius: 9, fontFamily: "'Inter', sans-serif",
        fontSize: "0.83rem", color: "#1c1917",
        outline: "none", transition: "border-color 0.18s",
        background: "white", boxSizing: "border-box",
      }}
      onFocus={e => e.target.style.borderColor = "#c2852a"}
      onBlur={e => e.target.style.borderColor = "#ece8e1"}
    />
    <span style={{
      position: "absolute", right: 13, top: "50%",
      transform: "translateY(-50%)",
      fontSize: "0.78rem", color: "#9a8c7a",
      fontFamily: "'Inter', sans-serif",
      pointerEvents: "none",
    }}>
      kg
    </span>
  </div>
</div>

        <Select label={t("cp.s1.bodyType")}
          value={d.bodyType} onChange={e => set("bodyType", e.target.value)}
          options={bodyTypeOptions} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select label={t("cp.s1.complexion")}
          value={d.complexion} onChange={e => set("complexion", e.target.value)}
          options={complexionOptions} />
        <Input
          label={t("cp.s1.mobile")}
          required
          type="tel"
          placeholder={t("cp.s1.mobilePh")}
          value={d.mobile}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 10);
            set("mobile", value);
          }}
        />
      </div>

      <Textarea label={t("cp.s1.about")} required
        placeholder={t("cp.s1.aboutPh")}
        value={d.about}
        onChange={e => set("about", e.target.value)}
        rows={4} />
    </div>
  );
}

function Step2({ d, set, t }) {
  const indiaData = locationData.India;

  const stateList = indiaData.states || [];

  const districtList =
    indiaData.districts?.[d.currentState] || [];

  const talukaList =
    indiaData.talukas?.[d.district] || [];

  const stateOptions = stateList.map(item => ({
    value: item,
    label: t(`locationLabels.${item}`, item),
  }));

  const districtOptions = districtList.map(item => ({
    value: item,
    label: t(`locationLabels.${item}`, item),
  }));

  const talukaOptions = talukaList.map(item => ({
    value: item,
    label: t(`locationLabels.${item}`, item),
  }));

  const motherTongueOptions =
    t("cp.options.motherTongue", {
      returnObjects: true,
    }) || [];

  const rashiOptions =
    t("cp.options.rashi", {
      returnObjects: true,
    }) || [];

  const nakshatraOptions =
    t("cp.options.nakshatra", {
      returnObjects: true,
    }) || [];

  const manglikOptions =
    t("cp.options.manglik", {
      returnObjects: true,
    }) || [];

  return (
    <div className="space-y-5">

      
        

      {/* State + District */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s2.currentState")}
          value={d.currentState}
          onChange={(e) => {
            set("currentState", e.target.value);
            set("district", "");
            set("taluka", "");
          }}
          options={stateOptions}
        />

        <Select
          label={t("cp.s2.district")}
          value={d.district}
          onChange={(e) => {
            set("district", e.target.value);
            set("taluka", "");
          }}
          options={districtOptions}
          disabled={!d.currentState}
        />
      </div>

      {/* Taluka + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s2.taluka")}
          value={d.taluka}
          onChange={(e) => set("taluka", e.target.value)}
          options={talukaOptions}
          disabled={!d.district}
        />

        <Input
          label={t("cp.s2.currentCity")}
          value={d.currentCity}
          onChange={(e) => set("currentCity", e.target.value)}
          placeholder={t("cp.s2.currentCityPh")}
        />
      </div>

      {/* Birth City + Birth Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Input
          label={t("cp.s2.birthCity")}
          value={d.birthCity}
          onChange={(e) => set("birthCity", e.target.value)}
          placeholder={t("cp.s2.birthCityPh")}
        />

        <Input
          type="time"
          label={t("cp.s2.birthTime")}
          value={d.birthTime}
          onChange={(e) => set("birthTime", e.target.value)}
        />
      </div>

      {/* Pincode + Gotra */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Input
          label={t("cp.s2.pincode")}
          value={d.pincode}
          onChange={(e) => set("pincode", e.target.value)}
          placeholder={t("cp.s2.pincodePh")}
        />

        <Input
          label={t("cp.s2.gotra")}
          value={d.gotra}
          onChange={(e) => set("gotra", e.target.value)}
          placeholder={t("cp.s2.gotraPh")}
        />
      </div>

      {/* Rashi + Nakshatra */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s2.rashi")}
          value={d.rashi}
          onChange={(e) => set("rashi", e.target.value)}
          options={rashiOptions}
        />
         <Input
          label={t("cp.s2.caste")}
          required
          placeholder={t("cp.s2.castePh")}
          value={d.caste || ""}
          onChange={(e) => set("caste", e.target.value)}
        />

        <Select
          label={t("cp.s2.nakshatra")}
          value={d.nakshatra}
          onChange={(e) => set("nakshatra", e.target.value)}
          options={nakshatraOptions}
        />

        <Select
        label={t("cp.s2.manglik")}
        value={d.manglik}
        onChange={(e) => set("manglik", e.target.value)}
        options={manglikOptions}
      />
      </div>

      

    </div>
  );
}



function Step3({ d, set, t }) {

   

  const familyTypeOptions =
    t("cp.options.familyType", { returnObjects: true }) || [];

  const fatherOccupationOptions =
    t("cp.options.fatherOccupation", { returnObjects: true }) || [];

  const motherOccupationOptions =
    t("cp.options.motherOccupation", { returnObjects: true }) || [];

  const siblingsOptions =
    t("cp.options.siblingsCount", { returnObjects: true }) || [];

  return (
    <div>

      {/* Father */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Input
          label={t("cp.s3.fatherName")}
          placeholder={t("cp.s3.fatherNamePh")}
          value={d.fatherName}
          onChange={(e) => set("fatherName", e.target.value)}
        />

        <Select
          label={t("cp.s3.fatherOccupation")}
          value={d.fatherOccupation}
          onChange={(e) => set("fatherOccupation", e.target.value)}
          options={fatherOccupationOptions}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Input
          label={t("cp.s3.fatherVillage")}
          placeholder={t("cp.s3.fatherVillagePh")}
          value={d.fatherVillage}
          onChange={(e) => set("fatherVillage", e.target.value)}
        />

        <Input
          label={t("cp.s3.fatherRelativeSurname")}
          placeholder={t("cp.s3.fatherRelativeSurnamePh")}
          value={d.fatherRelativeSurname}
          onChange={(e) => set("fatherRelativeSurname", e.target.value)}
        />
      </div>

      {/* Mother */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Input
          label={t("cp.s3.motherName")}
          placeholder={t("cp.s3.motherNamePh")}
          value={d.motherName}
          onChange={(e) => set("motherName", e.target.value)}
        />

        <Select
          label={t("cp.s3.motherOccupation")}
          value={d.motherOccupation}
          onChange={(e) => set("motherOccupation", e.target.value)}
          options={motherOccupationOptions}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Input
          label={t("cp.s3.motherVillage")}
          placeholder={t("cp.s3.motherVillagePh")}
          value={d.motherVillage}
          onChange={(e) => set("motherVillage", e.target.value)}
        />

        <Input
          label={t("cp.s3.motherRelativeSurname")}
          placeholder={t("cp.s3.motherRelativeSurnamePh")}
          value={d.motherRelativeSurname}
          onChange={(e) => set("motherRelativeSurname", e.target.value)}
        />
      </div>

      {/* Siblings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s3.siblings")}
          value={d.siblings}
          onChange={(e) => set("siblings", e.target.value)}
          options={siblingsOptions}
        />

        <Select
          label={t("cp.s3.siblingsMarried")}
          value={d.siblingsMarried}
          onChange={(e) => set("siblingsMarried", e.target.value)}
          options={[t("common.yes"), t("common.no")]}
        />
      </div>

      {/* Family Type */}
      <Select
        label={t("cp.s3.familyType")}
        value={d.familyType}
        onChange={(e) => set("familyType", e.target.value)}
        options={familyTypeOptions}
      />

    </div>
  );
}

function Step4({ d, set, t }) {

  const educationOptions =
    t("cp.options.education", { returnObjects: true });

  const employmentTypeOptions =
    t("cp.options.employmentType", { returnObjects: true });

  const incomeOptions =
    t("cp.options.income", { returnObjects: true });

  return (
    <div>

      {/* Education */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s4.education")}
          required
          value={d.education}
          onChange={(e) => set("education", e.target.value)}
          options={educationOptions}
        />

        <Input
          label={t("cp.s4.fieldOfStudy")}
          placeholder={t("cp.s4.fieldOfStudyPh")}
          value={d.fieldOfStudy}
          onChange={(e) => set("fieldOfStudy", e.target.value)}
        />
      </div>

      {/* Employment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s4.employmentType")}
          required
          value={d.employmentType}
          onChange={(e) => set("employmentType", e.target.value)}
          options={employmentTypeOptions}
        />

        <Select
          label={t("cp.s4.income")}
          value={d.income}
          onChange={(e) => set("income", e.target.value)}
          options={incomeOptions}
        />
      </div>

      {/* Work Location */}
      <Input
        label={t("cp.s4.workLocation")}
        placeholder={t("cp.s4.workLocationPh")}
        value={d.workLocation}
        onChange={(e) => set("workLocation", e.target.value)}
      />

    </div>
  );
}

function Step5({ d, set, toggleChip, t }) {

  const dietOptions =
    t("cp.options.diet", { returnObjects: true });

  const smokingOptions =
    t("cp.options.smoking", { returnObjects: true });

  const drinkingOptions =
    t("cp.options.drinking", { returnObjects: true });

  const fitnessOptions =
    t("cp.options.fitness", { returnObjects: true });

  const hobbies =
    t("cp.options.hobbies", { returnObjects: true });

  return (
    <div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s5.diet")}
          required
          value={d.diet}
          onChange={(e) => set("diet", e.target.value)}
          options={dietOptions}
        />

        <Select
          label={t("cp.s5.smoking")}
          value={d.smoking}
          onChange={(e) => set("smoking", e.target.value)}
          options={smokingOptions}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s5.drinking")}
          value={d.drinking}
          onChange={(e) => set("drinking", e.target.value)}
          options={drinkingOptions}
        />

        <Select
          label={t("cp.s5.fitness")}
          value={d.fitness}
          onChange={(e) => set("fitness", e.target.value)}
          options={fitnessOptions}
        />
      </div>

      <Chips
        label={t("cp.s5.hobbies")}
        options={hobbies}
        selected={d.hobbies}
        onToggle={(v) => toggleChip("hobbies", v)}
      />

    </div>
  );
}

function Step6({ d, set, t }) {
  const { i18n } = useTranslation();

  const partnerMaritalStatusOptions =
    t("cp.options.partnerMaritalStatus", { returnObjects: true });

  const partnerEducationOptions =
    t("cp.options.partnerEducation", { returnObjects: true });

  const partnerIncomeOptions =
    t("cp.options.partnerIncome", { returnObjects: true });

  const toMarathiNumber = (num) => {
    const marathiDigits = ["०","१","२","३","४","५","६","७","८","९"];
    return num.toString().replace(/\d/g, d => marathiDigits[d]);
  };

  const yearLabel = t("common.years");
  const isMarathi = i18n.language === "mr";

  // ── Age options ────────────────────────────────────────────────────────
  const ageOptions = Array.from({ length: 33 }, (_, i) => {
    const age = 18 + i;
    const displayAge = isMarathi ? toMarathiNumber(age) : age;
    return `${displayAge} ${yearLabel}`;
  });

  // Max age options — disable anything <= min age
  const maxAgeOptions = ageOptions.map((opt, i) => {
    const age = 18 + i;
    const minAge = d.partnerAgeMin ? parseInt(d.partnerAgeMin) : null;
    return {
      value: opt,
      label: opt,
      disabled: minAge !== null && age <= minAge,
    };
  });

  return (
    <div>

      {/* Age */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s6.partnerAgeMin")}
          value={d.partnerAgeMin}
          onChange={(e) => {
            const val = e.target.value;
            set("partnerAgeMin", val);
            // Clear max if min >= max
            if (d.partnerAgeMax && val >= d.partnerAgeMax) {
              set("partnerAgeMax", "");
            }
          }}
          options={ageOptions}
        />

        <Select
          label={t("cp.s6.partnerAgeMax")}
          value={d.partnerAgeMax}
          onChange={(e) => set("partnerAgeMax", e.target.value)}
          options={maxAgeOptions}
        />
      </div>

      {/* Height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <HeightPicker
          label={t("cp.s6.partnerHeightMin")}
          value={d.partnerHeightMin}
          onChange={(val) => {
            set("partnerHeightMin", val);
            if (d.partnerHeightMax) {
              const [minFt, minIn] = val.split("-").map(Number);
              const [maxFt, maxIn] = d.partnerHeightMax.split("-").map(Number);
              if (minFt > maxFt || (minFt === maxFt && minIn >= maxIn)) {
                set("partnerHeightMax", "");
              }
            }
          }}
        />

        <HeightPicker
          label={t("cp.s6.partnerHeightMax")}
          value={d.partnerHeightMax}
          minValue={d.partnerHeightMin}
          onChange={(val) => set("partnerHeightMax", val)}
        />
      </div>

      {/* Marital Status + Education */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
        <Select
          label={t("cp.s6.partnerMaritalStatus")}
          value={d.partnerMaritalStatus}
          onChange={(e) => set("partnerMaritalStatus", e.target.value)}
          options={partnerMaritalStatusOptions}
        />

        <Select
          label={t("cp.s6.partnerEducation")}
          value={d.partnerEducation}
          onChange={(e) => set("partnerEducation", e.target.value)}
          options={partnerEducationOptions}
        />
      </div>

      {/* Preferred Surname */}
      <Input
        label={t("cp.s6.preferredSurnames")}
        placeholder={t("cp.s6.preferredSurnamesPh")}
        value={d.preferredSurname}
        onChange={(e) => set("preferredSurname", e.target.value)}
      />

      {/* Income */}
      <Select
        label={t("cp.s6.partnerIncome")}
        value={d.partnerIncome}
        onChange={(e) => set("partnerIncome", e.target.value)}
        options={partnerIncomeOptions}
      />

      {/* Description */}
      <Textarea
        label={t("cp.s6.partnerDesc")}
        placeholder={t("cp.s6.partnerDescPh")}
        value={d.partnerDesc}
        onChange={(e) => set("partnerDesc", e.target.value)}
        rows={4}
      />

    </div>
  );
}

// ✅ onPhotoSelect prop added — actual file parent ला pass करण्यासाठी
function Step7({ d, set, t, onPhotoSelect }) {
  const [verifying, setVerifying] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handlePhoto = e => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    set("photos", [url]);
    onPhotoSelect(file); // ✅ actual file parent ला pass करा
  };
  const photo = d.photos && d.photos[0];

 

  return (
    <div>
      {/* ── PROFILE PHOTO ── */}
      <div className="mb-7">
        <Label>{t("cp.s7.profilePhoto")}</Label>
        <p className="text-[0.78rem] text-[#9a8c7a] mb-4">
          {t("cp.s7.photoDesc")}
        </p>
        <div className="flex flex-col items-center gap-4">
          {photo ? (
            <div className="relative">
              <img src={photo} alt="Profile"
                className="w-32 h-32 rounded-2xl object-cover border-2 border-[#e8c98a] shadow-md" />
              <button type="button" onClick={() => { set("photos", []); onPhotoSelect(null); }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-stone-800 text-white text-xs rounded-full flex items-center justify-center cursor-pointer border-2 border-white hover:bg-red-500 transition-colors">
                ×
              </button>
              {d.verified && (
                <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#4a7a4a] rounded-full flex items-center justify-center border-2 border-white text-white text-xs font-bold">
                  ✓
                </div>
              )}
            </div>
          ) : (
            <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-[#f0ddb8] bg-[#fdf6ec] flex flex-col items-center justify-center">
              <span className="text-4xl mb-1">👤</span>
              <span className="text-[0.65rem] text-[#9a8c7a]">No photo yet</span>
            </div>
          )}
          <label className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#e8c98a] bg-[#fdf6ec] text-[#c2852a] text-[0.8rem] font-semibold cursor-pointer hover:bg-[#f5e8cc] transition-colors">
            <span>{photo ? t("cp.s7.changePhoto") : t("cp.s7.uploadPhoto")}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </label>
        </div>
      </div>

      
    </div>
  );
}

/* ─── initial data ───────────────────────────────────────────── */
const initData = {
  firstName: "", lastName: "", dob: "", gender: "", maritalStatus: "", profileFor: "",
  height: "", weight: "", bodyType: "", complexion: "", mobile: "", about: "",
  currentCity: "", currentState: "", country: "", district: "",  taluka: "",
  birthCity: "", birthTime: "", rashi: "", nakshatra: "", gotra: "", manglik: "",pincode: "",
  caste: "",
  fatherName: "", fatherOccupation: "", fatherVillage: "", fatherRelativeSurname: "",
  motherName: "", motherOccupation: "", motherVillage: "",motherRelativeSurname: "",
  familyType: "",siblings: "", siblingsMarried: "",
  education: "", fieldOfStudy: "", college: "",
  employmentType: "", occupation: "", company: "", income: "", workLocation: "",
  diet: "", smoking: "", drinking: "", fitness: "",
  languages: [], hobbies: [], vehicle: "", property: "",
  partnerAgeMin: "", partnerAgeMax: "",
  partnerHeightMin: "", partnerHeightMax: "",
  partnerMaritalStatus: "", partnerReligion: "", partnerCaste: "",
  partnerEducation: "", partnerIncome: "", partnerLocation: "",
  partnerDiet: "", partnerManglik: "", partnerDesc: "",
  photos: [], idDoc: "", verified: false,
};

/* ─── main page ──────────────────────────────────────────────── */
export default function CompleteProfile({ onClose }) {
  const navigate        = useNavigate();
  // const { saveProfile } = useProfile();
  const { t, i18n } = useTranslation();
  const [step,      setStep]      = useState(1);
  // const [data,      setData]      = useState(initData);


const { profileData, saveProfile } = useProfile();
// ✅ Pre-fill form with existing data so edit mode shows current values
const [data, setData] = useState({ ...initData, ...profileData });


  const [toast,     setToast]     = useState(false);
  const [saving,    setSaving]    = useState(false);   // ✅ loading state
  const [saveError, setSaveError] = useState("");      // ✅ error state
  const [photoFile, setPhotoFile] = useState(null);    // ✅ actual photo file
  const scrollRef = useRef(null);

  const steps = STEPS(t);

  const set = (key, val) => setData(d => ({ ...d, [key]: val }));

  const toggleChip = (key, val) =>
    setData(d => ({
      ...d,
      [key]: d[key].includes(val) ? d[key].filter(x => x !== val) : [...d[key], val],
    }));

  const pct = Math.round(((step - 1) / steps.length) * 100);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const next = () => {
    if (step < steps.length) { setStep(s => s + 1); scrollToTop(); }
  };

  const prev = () => {
    if (step > 1) { setStep(s => s - 1); scrollToTop(); }
  };

  // ✅ API integrated save function
  const save = async () => {
    setSaving(true);
    setSaveError("");

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      const userId = loggedInUser?.id;

      if (!userId) {
        setSaveError("User not found. Please login again.");
        setSaving(false);
        return;
      }

      // ✅ FormData बनवा (photo file असल्यामुळे)
      const formData = new FormData();

      // सगळे text/array fields append करा
      Object.keys(data).forEach(key => {
        if (key === "photos" || key === "idDoc" || key === "verified") return;

        if (Array.isArray(data[key])) {
          // languages, hobbies → JSON string म्हणून पाठवा
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key] || "");
        }
      });

      // ✅ Photo file असेल तर append करा
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/profile`,
        {
          method: "PATCH",
          body: formData,
          // ✅ Content-Type header नको — FormData आपोआप set करतो
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setSaveError(result.message || "Profile save failed. Please try again.");
        setSaving(false);
        return;
      }

      // ✅ localStorage मध्ये updated user save करा
      localStorage.setItem("user", JSON.stringify(result.user));

      // ✅ Context update
      saveProfile(data);

      // ✅ Success toast दाखवा
      setToast(true);
      setTimeout(() => {
        setToast(false);
        if (onClose) onClose();
        else navigate("/profile");
      }, 2000);

    } catch (err) {
      console.error("Profile save error:", err);
      setSaveError("Network error. Please check your connection.");
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Escape" && onClose) onClose(); };

  const stepInfo = [
    t("cp.stepInfo.1"),
    t("cp.stepInfo.2"),
    t("cp.stepInfo.3"),
    t("cp.stepInfo.4"),
    t("cp.stepInfo.5"),
    t("cp.stepInfo.6"),
    t("cp.stepInfo.7"),
  ];

  const card = (
    <div
      className="w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: "white",
        boxShadow: "0 8px 48px rgba(28,25,23,0.18)",
        border: "1px solid #ece8e1",
        maxHeight: "90vh",
      }}
    >
      {/* ══ CARD HEADER ══ */}
      <div style={{ background: DARK }}>
        <div className="px-6 pt-5 pb-3 flex items-center justify-between">
          <div>
            <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase mb-0.5" style={{ color: "#c2852a" }}>
              {t("cp.header.tag")}
            </p>
            <h1 className="text-[1.25rem] font-bold text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t("cp.header.title")}
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">

  {/* Language Toggle */}
  <button
    onClick={() =>
      i18n.changeLanguage(
        i18n.language === "en" ? "mr" : "en"
      )
    }
    className="px-3 py-1 rounded-full border border-[#c2852a] text-[#f4c27a] text-[0.7rem] font-semibold hover:bg-[#c2852a] hover:text-white transition"
    style={{
      background: "rgba(194,133,42,0.12)"
    }}
  >
    {i18n.language === "en" ? "मराठी" : "English"}
  </button>

  <div
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.72rem] font-bold"
    style={{
      background: "rgba(194,133,42,0.18)",
      color: "#e8c98a"
    }}
  >
    <span>{steps[step - 1].icon}</span>

    <span>
      {t("cp.header.stepOf", {
        step,
        total: steps.length
      })}
    </span>
  </div>

  {onClose && (
    <button
      onClick={onClose}
      className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer border-none text-lg leading-none"
      style={{ background: "transparent" }}
      aria-label="Close"
    >
      ×
    </button>
  )}
</div>
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[0.68rem] text-white/50">{steps[step-1].label}</span>
            <span className="text-[0.68rem] font-bold" style={{ color: "#e8c98a" }}>{pct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg, #c2852a, #e8c98a)" }} />
          </div>
        </div>

        {/* Step pills */}
        <div className="flex gap-1.5 px-6 pb-4 mt-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {steps.map(s => {
            const done = s.id < step, current = s.id === step;
            return (
              <button key={s.id} onClick={() => setStep(s.id)}
                className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold border transition-all cursor-pointer"
                style={{
                  background:  current ? ACCENT : done ? "rgba(194,133,42,0.15)" : "rgba(255,255,255,0.07)",
                  color:       current ? "white" : done ? "#e8c98a"               : "rgba(255,255,255,0.45)",
                  borderColor: current ? ACCENT  : done ? "rgba(194,133,42,0.3)"  : "rgba(255,255,255,0.1)",
                }}>
                <span className="text-[0.7rem]">{done ? "✓" : s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ CARD BODY ══ */}
      <div ref={scrollRef} className="overflow-y-auto flex-1">
        <div className="px-6 py-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#f0ede9]">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: "#fdf6ec", border: "1px solid #f0ddb8" }}>
              {steps[step - 1].icon}
            </div>
            <div>
              <h2 className="text-[1.05rem] font-bold text-[#1c1917]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {steps[step - 1].label}
              </h2>
              <p className="text-[0.7rem] text-[#9a8c7a]">{stepInfo[step - 1]}</p>
            </div>
          </div>
          {step === 1 && <Step1 d={data} set={set} t={t} />}
          {step === 2 && <Step2 d={data} set={set} t={t} />}
          {step === 3 && <Step3 d={data} set={set} t={t} />}
          {step === 4 && <Step4 d={data} set={set} t={t} />}
          {step === 5 && <Step5 d={data} set={set} toggleChip={toggleChip} t={t} />}
          {step === 6 && <Step6 d={data} set={set} t={t} />}
          {step === 7 && <Step7 d={data} set={set} t={t} onPhotoSelect={setPhotoFile} />}
        </div>
      </div>

      {/* ══ CARD FOOTER ══ */}
      <div className="px-6 py-4 flex flex-col gap-2 flex-shrink-0"
        style={{ borderTop: "1px solid #ece8e1", background: "#fdfcfa" }}>

        {/* ✅ Error message */}
        {saveError && (
          <p className="text-red-500 text-[0.78rem] text-center bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {saveError}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <button onClick={prev} disabled={step === 1}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[0.82rem] font-medium transition-all cursor-pointer border"
            style={{ background: "white", color: "#4a3f35", borderColor: "#ece8e1", opacity: step === 1 ? 0.3 : 1 }}
            onMouseEnter={e => { if (step > 1) e.currentTarget.style.borderColor = ACCENT; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#ece8e1"; }}>
            {t("cp.footer.back")}
          </button>

          <div className="flex items-center gap-1.5">
            {steps.map(s => (
              <div key={s.id} onClick={() => setStep(s.id)} className="rounded-full transition-all duration-300 cursor-pointer"
                style={{ width: s.id === step ? 20 : 6, height: 6,
                  background: s.id === step ? ACCENT : s.id < step ? "#e8c98a" : "#ece8e1" }} />
            ))}
          </div>

          {step < steps.length ? (
            <button onClick={next}
              className="px-6 py-2.5 rounded-xl text-white text-[0.82rem] font-semibold cursor-pointer border-none"
              style={{ background: ACCENT, boxShadow: "0 2px 12px rgba(194,133,42,0.3)" }}
              onMouseEnter={e => e.currentTarget.style.background = "#a8701f"}
              onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
              {t("cp.footer.next")}
            </button>
          ) : (
            // ✅ Save button with loading + disabled state
            <button onClick={save} disabled={saving}
              className="px-6 py-2.5 rounded-xl text-white text-[0.82rem] font-semibold cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "#4a7a4a", boxShadow: "0 2px 12px rgba(74,122,74,0.3)" }}
              onMouseEnter={e => { if (!saving) e.currentTarget.style.background = "#3a6a3a"; }}
              onMouseLeave={e => { if (!saving) e.currentTarget.style.background = "#4a7a4a"; }}>
              {saving ? "Saving..." : t("cp.footer.save")}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  /* ── Success toast component ── */
  const successToast = (
    <>
      <style>{`
        @keyframes popIn { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
        @keyframes drawCircle { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
        @keyframes drawTick   { from { stroke-dashoffset: 60;  } to { stroke-dashoffset: 0; } }
      `}</style>
      <div className="w-full max-w-sm rounded-3xl flex flex-col items-center text-center px-8 py-10 bg-white border border-[#ece8e1] shadow-2xl"
        style={{ animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <div className="mb-5">
          <svg width="88" height="88" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="44" fill="#fdf6ec" stroke="#f0ddb8" strokeWidth="2" />
            <circle cx="48" cy="48" r="38" fill="none" stroke="#c2852a" strokeWidth="3.5"
              strokeLinecap="round" strokeDasharray="200" strokeDashoffset="0"
              style={{ animation: "drawCircle 0.6s ease forwards", transformOrigin: "center", transform: "rotate(-90deg)" }} />
            <polyline points="30,50 43,63 66,36" fill="none" stroke="#c2852a"
              strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="60" strokeDashoffset="0"
              style={{ animation: "drawTick 0.4s 0.5s ease both" }} />
          </svg>
        </div>
        <span className="text-[0.62rem] font-bold tracking-widest uppercase text-[#c2852a] mb-2">
          {t("cp.toast.tag")}
        </span>
        <h2 className="text-[1.6rem] font-bold text-[#1c1917] mb-1.5"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {t("cp.toast.title")}
        </h2>
        <p className="text-[#9a8c7a] text-[0.83rem] mb-5">
          {t("cp.toast.subtitle")}
        </p>
        <div className="w-10 h-px bg-[#f0ddb8] mb-5" />
        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-[1.2rem] font-bold text-[#1c1917]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>8×</p>
            <p className="text-[0.62rem] text-[#9a8c7a] uppercase tracking-wide mt-0.5">{t("cp.toast.responses")}</p>
          </div>
          <div className="w-px h-8 bg-[#f0ddb8]" />
          <div className="text-center">
            <p className="text-[1.2rem] font-bold text-[#1c1917]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>100%</p>
            <p className="text-[0.62rem] text-[#9a8c7a] uppercase tracking-wide mt-0.5">{t("cp.toast.complete")}</p>
          </div>
          <div className="w-px h-8 bg-[#f0ddb8]" />
          <div className="text-center">
            <p className="text-[1.2rem] font-bold text-[#4a7a4a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>✓</p>
            <p className="text-[0.62rem] text-[#9a8c7a] uppercase tracking-wide mt-0.5">{t("cp.toast.verified")}</p>
          </div>
        </div>
      </div>
    </>
  );

  /* ── When used as modal overlay ── */
  if (onClose) {
    return (
      <>
        <style>{`body { overflow: hidden; }`}</style>
        {toast && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-stone-950/70 backdrop-blur-sm">
            {successToast}
          </div>
        )}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          style={{ background: "rgba(28,25,23,0.65)", backdropFilter: "blur(4px)" }}
          onKeyDown={handleKeyDown}
        >
          <div className="absolute inset-0" onClick={onClose} />
          <div className="relative z-10 w-full max-w-2xl">{card}</div>
        </div>
      </>
    );
  }

  /* ── When used as standalone page (fallback) ── */
  return (
    <div className="min-h-screen flex items-start justify-center py-10 pt-20 px-4 pb-16"
      style={{ background: "#f9f7f4", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      {toast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-sm">
          {successToast}
        </div>
      )}
      {card}
    </div>
  );
}
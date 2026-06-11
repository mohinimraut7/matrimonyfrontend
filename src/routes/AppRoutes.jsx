// import { Routes, Route } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";

// import Home from "../pages/Home";
// import About from "../pages/About";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Profile from "../pages/Profile";
// import Matches from "../pages/Matches";
// import ViewProfile from "../pages/ViewProfile";
// import Shortlist from "../pages/Shortlist";
// import Interests from "../pages/Interests";
// // import Messages from "../pages/Messages";
// import KundaliMatching from "../pages/KundaliMatching";
// import CompleteProfile from "../pages/CompleteProfile";


// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route path="/profile" element={<Profile />} />
//         <Route path="/profile/:id" element={<ViewProfile />} />

//         <Route path="/matches" element={<Matches />} />
//         <Route path="/shortlist" element={<Shortlist />} />
//         <Route path="/interests" element={<Interests />} />

        
//         {/* <Route path="/chats" element={<Messages />} />
//         <Route path="/chats/:id" element={<Messages />} /> */}

//         <Route path="/kundali" element={<KundaliMatching />} />
//         <Route path="/complete-profile" element={<CompleteProfile />} />



//       </Route>
//     </Routes>
//   );
// }



import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute"

import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Matches from "../pages/Matches";
import ViewProfile from "../pages/ViewProfile";
import Shortlist from "../pages/Shortlist";
import Interests from "../pages/Interests";
// import Messages from "../pages/Messages";
// import KundaliMatching from "../pages/KundaliMatching";
import CompleteProfile from "../pages/CompleteProfile";


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ViewProfile />} />

        {/* ✅ /matches — protected route */}
        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          }
        />

        <Route path="/shortlist" element={<Shortlist />} />
        <Route path="/interests" element={<Interests />} />

        {/* <Route path="/chats" element={<Messages />} />
        <Route path="/chats/:id" element={<Messages />} /> */}

        {/* <Route path="/kundali" element={<KundaliMatching />} /> */}
        <Route path="/complete-profile" element={<CompleteProfile />} />

      </Route>
    </Routes>
  );
}
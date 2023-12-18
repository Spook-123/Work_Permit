import "./App.css";
import Permit from "./page/Permit";
import { Route, Routes } from "react-router-dom";
import Dashboad from "./page/Dashboad";
import PrivateRoute from "./auth/PrivateRoute";
import OpenRoute from "./auth/OpenRoute";
// import Home from "./page/Home";
import Login from "./components/landingpage/components/Login";
import Signup from "./components/landingpage/components/Signup";
import ConfinedSpacePermit from "./components/confinedSpacePermit/confinedSpacePermit/src/App";
import PermitTM from "./page/PermitTM";
import AcceptedCards from "./components/AcceptedCard";
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route path="/permit/:id" element={<PrivateRoute><Permit /></PrivateRoute>} />
      <Route path="/permit" element={<PrivateRoute><Permit /></PrivateRoute>} />
      {/* <Route path="/Dashboard" element={<PrivateRoute><Dashboad /></PrivateRoute>} /> */}
      <Route path="/formpending" element={<PrivateRoute><Dashboad /></PrivateRoute>} />
      <Route
        path="/confinedSpacePermit/:id1?/:id?"
        element={<PrivateRoute><ConfinedSpacePermit /></PrivateRoute>}
      />
      <Route
        path="/acceptedForms"
        element={<PrivateRoute><Dashboad /></PrivateRoute>}
      />
      {/* <Route path="/confinedSpacePermit" element={<ConfinedSpacePermit />} /> */}
      <Route path="/permitToMove/:id1?/:id?" element={<PrivateRoute><PermitTM /></PrivateRoute>} />
      {/* <Route path="/Dashboard" element={<Dashboad/>}/> */}
    </Routes>
  );
}

export default App;

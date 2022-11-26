import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from "react";

import Navbar from "./Components/Navbar/navbar.component";
import Landing from "./screens/Landing/landing";
import RecoverSession from "./screens/RecoverSession/recoverSession";
import UploadTranscript from "./screens/UploadTranscript/uploadTranscript";
import StartingIntent from "./screens/StartingIntent/StartingIntent";
import SavingSession from "./screens/SavingSession/savingSession";
import SessionProvider from "./Contexts/sessionProvider";

function App() {
  return (
    <Router>
      <div>
        {/* SessionProvider contains all global vars (navstate, session id) */}
        <SessionProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/recover" element={<RecoverSession />} />
            <Route path="/upload" element={<UploadTranscript />} />
            <Route path="/save" element={<SavingSession />} />
            <Route path="/startingintent" element={<StartingIntent />} />
          </Routes>
        </SessionProvider>
      </div>
    </Router>
  );
}

export default App;

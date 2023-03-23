import "react-toastify/dist/ReactToastify.css";

import { AddHackathon, Details, EditHackathon, Home } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/add" element={<AddHackathon />} />
          <Route path="/edit/:id" element={<EditHackathon />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </LocalizationProvider>
  );
}

export default App;

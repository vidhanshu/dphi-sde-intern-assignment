import { AddHackathon, Details, Home } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/add" element={<AddHackathon />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;

import "react-toastify/dist/ReactToastify.css";

import { AddHackathon, Details, EditHackathon, Home } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#44924C",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;

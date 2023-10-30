import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Card from "./components/Card/Card";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { DetalleModal } from "./components/DetalleModal/DetalleModal";

// import { useEffect } from "react";
// import { useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/detailrecipe/:idRecipie" element={<DetalleModal />} /> */}
        <Route path="/createrecipe" element={<Form />} />;
      </Routes>
    </div>
  );
}

export default App;

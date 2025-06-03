// import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./Screen/Home/HomeScreen";
import ResultScreen from "./Screen/ResultScreen";
import ImageUpload from "./Screen/UploadImage/ImageUpload";
import ResultScreen2 from "./Screen/ResultScreen2";
import FrontPage from "./FrontPage";
import Rock from "./Rock";
// import { useEffect } from "react";

// import DataSend from "./Screen/DataSend";

function App() {
  // useEffect(() => {
  // }, [fetch]);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Rock />} />
        </Routes>
        <div className="px-20 py-10">
          <Routes>
            <Route path="/model" element={<HomeScreen />} />
            {/* <Route path="/" element={<DataSend />} /> */}
            <Route path="/upload/:id" element={<ImageUpload />} />
            <Route path="/Analysing/:id" element={<ResultScreen />} />
            <Route path="/identify/:id" element={<ResultScreen2 />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

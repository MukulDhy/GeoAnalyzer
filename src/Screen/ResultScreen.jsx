import { useDispatch, useSelector } from "react-redux";
import React, { lazy, useEffect, useState } from "react";
// import Loading from "../Component/Loading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Select, Option } from "@material-tailwind/react";
import { imageMlDataAction } from "../Redux/actions/allAction";
import ReactLoading from "react-loading";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const downloadPdfDocument = () => {
//   const input = document.body;
//   html2canvas(document.body).then((canvas) => {
//     // Create a new jsPDF instance
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [canvas.width, canvas.height],
//     });

//     // Add the canvas image to the PDF
//     const imgData = canvas.toDataURL("image/png");
//     pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

//     // Save the PDF
//     pdf.save("download.pdf");
//   });
// };

const printDocument = () => {
  window.print();
};

const ResultScreen = () => {
  // const setPre = () => {
  //   setPredication([
  //     { name: "adwdwa", x: 23, y: 100, confidence: 0.45132 },
  //     { x: 65, y: 97, confidence: 0.323115 },
  //     { x: 123, y: 900, confidence: 0.42445 },
  //     { x: 63, y: 10, confidence: 0.85543 },
  //   ]);
  // };

  // setTimeout(setPre, 5000);

  const { imageDetails } = useSelector((state) => state.getImage);

  const location = useLocation();
  const navigation = useNavigate();
  let task = location.pathname.split("/").pop();
  let imageId = location.search.split("=").pop();

  const { loading, success, error, prediction, orgResponse } = useSelector(
    (state) => state.imgMlInfo
  );

  const dispatch = useDispatch();

  const [suc, setSuc] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!imageDetails) {
      navigation(`/upload/${task}`);
      return;
    }

    const fetchData = async () => {
      if (task === "crack") {
        await dispatch(imageMlDataAction(imageId, "crackImage"));
      } else if (task === "lithology") {
        await dispatch(imageMlDataAction(imageId, "lithology"));
      } else if (task === "discontinuity") {
        await dispatch(imageMlDataAction(imageId, "crack"));
      }
    };

    fetchData();
  }, [imageId, task, imageDetails, navigation, dispatch]);

  useEffect(() => {
    if (success === true) {
      setSuc(true);
      setImageUrl(`http://localhost:6969/api/v1/image/result/${imageId}`);
    }
  }, [success, imageId]);

  const handleClick = () => {
    // Additional logic can be added here
    window.open(
      `http://localhost:6969/api/v1/image/result/${imageId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  // const fetch = async() => {
  //   try {
  //     const response = await axios.post("/api/v1/ml/")
  //   } catch (error) {
  //     console.log(error`http://localhost:6969/api/v1/image/result/${imageId}`  //   }
  // };

  return (
    <>
      <div className="previewText text-center mb-2 text-2xl">RESULT SCREEN</div>
      <div className="flex gap-10 w-full">
        <div className="w-1/2">
          <div className="card my-5 relative h-[263px]">
            {/* {loading && <Loading></Loading>} */}
            {/* {imagePreview} */}
            <img
              src={imageDetails}
              className="h-64 w-full"
              alt="PreviewImage"
            />
          </div>
          <h2 className="text-center font-bold text-white text-xl">
            Orginial Picture
          </h2>
        </div>
        <div className="w-1/2">
          <div className="card my-5 relative h-[263px]" onClick={handleClick}>
            {/* {loading && <Loading></Loading>} */}
            {/* {imagePreview} */}
            {/* <img src={imageDetails } className="h-64" alt="PreviewImage" /> */}
            {loading === true ? (
              <>
                <ReactLoading
                  color={"#ffffff"}
                  height={"20%"}
                  width={"20%"}
                  className="-translate-y-5"
                />
              </>
            ) : (
              <>
                {suc === true ? (
                  <>
                    <img
                      src={`http://localhost:6969/api/v1/image/result/${imageId}`}
                      onLoad={lazy}
                      className="w-full h-64"
                      alt="PreviewImage"
                    />
                  </>
                ) : (
                  <>
                    <div className="previewText text-center mb-2 text-2xl">
                      Try with other image or Error Occured
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <h2 className="text-center font-bold text-white text-xl">
            Result Picture
          </h2>
        </div>
      </div>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <h2 className="previewText text-2xl mt-3">Prediction : </h2>
        {loading && <Skeleton count={3} />}
        {suc && (
          <>
            <div className="flex flex-wrap gap-5">
              {prediction &&
                prediction.map((ele, idx) => {
                  return (
                    <div
                      className={`precard p-2 my-1 ${
                        ele.confidence * 100 >= 50
                          ? "text-green-500"
                          : "text-red-600"
                      }`}
                      key={idx}
                    >
                      <div className="flex gap-3">
                        <h2>
                          Name :{" "}
                          {ele.name ? ele.name : `ROCK ${idx}` || <Skeleton />}
                        </h2>
                        <h2>Width : {ele.width || <Skeleton />}</h2>
                        <h2>Height : {ele.height || <Skeleton />}</h2>
                      </div>
                      <div className="p-1 pl-4">
                        <p>X : {ele.x || <Skeleton />}</p>
                        <p>Y : {ele.y || <Skeleton />}</p>
                        <p>
                          Confidence : {ele.confidence * 100 || <Skeleton />}
                        </p>
                      </div>
                    </div>
                  );
                })}
              {prediction === null && (
                <h2 className="text-3xl previewText uppercase">Data -</h2>
              )}
              {error && (
                <h2 className="text-3xl previewText uppercase">{error}</h2>
              )}
            </div>
            {prediction && (
              <>
                <button
                  type="submit"
                  className="text-center w-50px"
                  onClick={printDocument}
                >
                  <span className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md">
                    Download Pdf or Print as Pdf
                  </span>
                </button>
              </>
            )}
          </>
        )}
      </SkeletonTheme>
      <div className="font-serif text-2xl text-white">{orgResponse}</div>
    </>
  );
};

export default ResultScreen;

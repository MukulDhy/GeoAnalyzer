import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { imageMlDataAction } from "../Redux/actions/allAction";

const ResultScreen2 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { imageDetails } = useSelector((state) => state.getImage);
  const { loading, prediction,success } = useSelector((state) => state.imgMlInfo);

  const [predict, setPredict] = useState([]);
  const task = location.pathname.split("/").pop();
  const imageId = location.search.split("=").pop();


    const [time,setTime] = useState(0);

  useEffect(() => {
    // Update predict state when prediction changes
    if (prediction) {
      const { predictions,time } = prediction[0];
      let maxValue = -Infinity;
      let SecondmaxValue = -Infinity;
      let secondMax = ""
      let maxKey = "";
      setTime(time)

      Object.entries(predictions).forEach(([key, obj]) => {
        if (obj.confidence > maxValue) {
            SecondmaxValue = maxValue;
          maxValue = obj.confidence;
          secondMax = maxKey;
          maxKey = key;
        }
      });
      console.log(secondMax)
      setPredict([maxKey]);
      if(maxValue*100 - SecondmaxValue*100 <= 10){
          setPredict([maxKey,secondMax]);
        }
    }
  }, [prediction]);

  useEffect(() => {
    if (!imageDetails) {
      navigate(`/upload/${task}`);
      return;
    }
    setPredict("")
    setTime(0)
    if (task === "mineral") {
      dispatch(imageMlDataAction(imageId, "mineral"));
    }
    // Add other task conditions if necessary
    if (task === "rock") {
      dispatch(imageMlDataAction(imageId, "rock"));
    }
  }, [imageId,imageDetails ,task, dispatch, navigate]);

  return (
    <>
      <div className="previewText text-center mb-2 text-2xl">RESULT SCREEN</div>
      <div className="text-white">Predicted Classes :  {task === 'mineral' ? "benitoite, calcite, copper, cuprite, erythrite, gold, gypsum, halite, limonite, magnetite, opal, prehnite, pyrite, silver, tantalite-(mn)" : "(Mudstone), Basalt, Clay, Conglomerate, Diatomite, Shale, Siliceous, basalt, chert, gypsum, olivine, sinter"}</div>
      <div className="flex gap-10 w-full">
        <div className="w-full">
          <div className="card my-5 relative h-[263px]">
            {loading && (
              <ReactLoading color={"#ffffff"} height={"5%"} width={"5%"} className="-translate-y-7 -translate-x-1 absolute" />
            )}
            <img src={imageDetails} className="p-5 w-[350px] h-[264px]" alt="PreviewImage" />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="previewText p-5 mb-2 text-3xl ">
          PREDICTED {task.toUpperCase()} - {predict.length === 1 ? predict[0].toUpperCase() : predict.length === 1 ? predict.map((val,idx) => {
            return <span key={idx}>{val} {idx === 0 ? "or" : ""} {prediction.predicted_classes[0]} </span>
          }): "" }
        </div>
        <div className="previewText p-5 mb-2 text-xl text-end">
          TIME TAKEN - {(time * 100).toFixed(2)} sec
        </div>
      </div>
      <div className="flex flex-wrap bg-gray-100 p-5 rounded-lg shadow-md">
    <div className="flex-1 min-w-0">
        <div className="text-2xl font-bold text-gray-700 mb-4">DATA</div>
        {prediction && success && prediction.map((pred, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow">
                <div className="text-lg font-semibold text-gray-600">Time: <span className="font-normal text-gray-800">{pred.time}</span></div>
                {/* <div className="text-lg font-semibold text-gray-600">Image Dimensions: <span className="font-normal text-gray-800">{pred.image.width} x {pred.image.height} px</span></div> */}
                <div className="text-lg font-semibold text-gray-600">Predictions:</div>
                <ul className="list-disc pl-5">
                    {Object.entries(pred.predictions).map(([key, value]) => (
                        <li key={key} className="text-gray-700">{key}: <span className="font-bold text-blue-600">{value.confidence}</span></li>
                    ))}
                </ul>
                <div className="text-lg font-semibold text-gray-600">Predicted Classes: <span className="font-normal text-gray-800">{pred.predicted_classes.join(", ")}</span></div>
                <div className="text-lg font-semibold text-gray-600">Image Path: <span className="font-normal text-gray-800">{pred.image_path}</span></div>
                <div className="text-lg font-semibold text-gray-600">Prediction Type: <span className="font-normal text-gray-800">{pred.prediction_type}</span></div>
            </div>
        ))}
    </div>
</div>

    </>
  );
};

export default ResultScreen2;

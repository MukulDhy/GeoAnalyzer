import { useDispatch, useSelector } from "react-redux";
import React, { lazy, useEffect, useState, useCallback, useRef } from "react";
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

// Error Popup Component
const ErrorPopup = ({ error, onClose, onRetry, showRetry = true }) => {
  if (!error) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-red-500 rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="flex items-center mb-4">
          <div className="bg-red-500 rounded-full p-2 mr-3">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-400">Error Occurred</h3>
        </div>

        <p className="text-gray-300 mb-6">
          {typeof error === "string"
            ? error
            : "An unexpected error occurred. Please try again."}
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
          {showRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Loading Overlay Component
const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center rounded">
    <div className="text-center">
      <ReactLoading
        color={"#ffffff"}
        height={"20%"}
        width={"20%"}
        className="mx-auto mb-2"
      />
      <p className="text-white text-sm">Processing image...</p>
    </div>
  </div>
);

// Image Display Component
const ImageDisplay = ({ src, alt, onClick, loading, error }) => (
  <div className="card my-5 relative h-[263px] bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
    {loading && <LoadingOverlay />}
    {error ? (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-400">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p>Failed to load image</p>
        </div>
      </div>
    ) : (
      <img
        src={src}
        className="h-64 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
        alt={alt}
        onClick={onClick}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling?.classList.remove("hidden");
        }}
      />
    )}
    <div className="hidden flex items-center justify-center h-full">
      <div className="text-center text-gray-400">
        <svg
          className="w-12 h-12 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        <p>Image not available</p>
      </div>
    </div>
  </div>
);

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

  // Local state management
  const [localSuccess, setLocalSuccess] = useState(false);
  const [localPrediction, setLocalPrediction] = useState(null);
  const [localOrgResponse, setLocalOrgResponse] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Use ref to prevent multiple API calls
  const isProcessingRef = useRef(false);
  const lastImageIdRef = useRef(null);

  // Validation and error handling
  useEffect(() => {
    if (!imageDetails) {
      navigation(`/upload/${task}`);
      return;
    }

    if (!imageId || !task) {
      setShowErrorPopup(true);
      return;
    }

    // Only fetch if we haven't initialized or if imageId changed
    if (!hasInitialized || lastImageIdRef.current !== imageId) {
      fetchMLData();
      setHasInitialized(true);
      lastImageIdRef.current = imageId;
    }
  }, [imageId, task, imageDetails, navigation, hasInitialized]);

  // const handleRetry = () => {
  //   dispatch(resetImageMlData()); // Clear previous state
  //   dispatch(imageMlDataAction(imageId, task));
  // };

  // Or use the retry version with automatic retries
  // const handleRetryWithBackoff = () => {
  //   dispatch(resetImageMlData());
  //   dispatch(imageMlDataActionWithRetry(imageId, task));
  // };

  const fetchMLData = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    try {
      if (task === "crack") {
        await dispatch(imageMlDataAction(imageId, "crackImage"));
      } else if (task === "lithology") {
        await dispatch(imageMlDataAction(imageId, "lithology"));
      } else if (task === "discontinuity") {
        await dispatch(imageMlDataAction(imageId, "crack"));
      } else {
        throw new Error(`Unknown task type: ${task}`);
      }
    } catch (err) {
      console.error("Error fetching ML data:", err);
      setShowErrorPopup(true);
    } finally {
      isProcessingRef.current = false;
    }
  }, [dispatch, imageId, task]);

  // Handle success state and preserve data locally
  useEffect(() => {
    if (success === true && prediction !== undefined) {
      console.log("Success received, preserving data:", {
        prediction,
        orgResponse,
      });
      setLocalSuccess(true);
      setLocalPrediction(prediction);
      setLocalOrgResponse(orgResponse);
      // Only set image URL after successful analysis
      fetchResultImage();
      setImageLoadError(false);
    }
  }, [success, prediction, orgResponse, imageId]);

  // Function to fetch the result image after successful analysis
  const fetchResultImage = useCallback(async () => {
    try {
      const resultImageUrl = `https://geoanalyzer.onrender.com/api/v1/image/result/${imageId}`;

      // Test if the image exists by making a HEAD request or trying to load it
      const img = new Image();
      img.onload = () => {
        setImageUrl(resultImageUrl);
        setImageLoadError(false);
      };
      img.onerror = () => {
        console.error("Failed to load result image");
        setImageLoadError(true);
      };
      img.src = resultImageUrl;
    } catch (err) {
      console.error("Error fetching result image:", err);
      setImageLoadError(true);
    }
  }, [imageId]);

  // Handle error state
  useEffect(() => {
    if (error && !loading) {
      console.log("Error received:", error);
      setShowErrorPopup(true);
    }
  }, [error, loading]);

  const handleRetry = () => {
    console.log("Retrying...");
    setShowErrorPopup(false);
    setLocalSuccess(false);
    setLocalPrediction(null);
    setLocalOrgResponse(null);
    setImageLoadError(false);
    setImageUrl(""); // Clear image URL on retry
    setHasInitialized(false);
    isProcessingRef.current = false;
    // Clear the ref to allow re-fetching
    lastImageIdRef.current = null;
  };

  const handleCloseError = () => {
    setShowErrorPopup(false);
  };

  const handleClick = () => {
    if (imageUrl) {
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleImageError = () => {
    setImageLoadError(true);
  };

  // const fetch = async() => {
  //   try {
  //     const response = await axios.post("/api/v1/ml/")
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getTaskDisplayName = (taskName) => {
    const taskMap = {
      crack: "Crack Detection",
      lithology: "Lithology Analysis",
      discontinuity: "Discontinuity Detection",
    };
    return taskMap[taskName] || taskName.toUpperCase();
  };

  // Use local state for rendering, fallback to Redux state
  const displaySuccess = localSuccess || success;
  const displayPrediction =
    localPrediction !== null ? localPrediction : prediction;
  const displayOrgResponse = localOrgResponse || orgResponse;

  return (
    <>
      <div className="px-4 md:px-20 py-10 min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              RESULT SCREEN
            </h1>
            <p className="text-gray-400 text-lg">
              {getTaskDisplayName(task)} Analysis Results
            </p>
          </div>

          {/* Image Comparison Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Original Image */}
            <div className="space-y-4">
              <ImageDisplay
                src={imageDetails}
                alt="Original Image"
                loading={false}
                error={!imageDetails}
              />
              <h2 className="text-center font-bold text-white text-xl">
                Original Picture
              </h2>
            </div>

            {/* Result Image - Only show after successful analysis */}
            <div className="space-y-4">
              {displaySuccess ? (
                <>
                  <ImageDisplay
                    src={imageUrl}
                    alt="Result Image"
                    onClick={handleClick}
                    loading={loading || (!imageUrl && !imageLoadError)}
                    error={imageLoadError}
                  />
                  <h2 className="text-center font-bold text-white text-xl">
                    Result Picture
                  </h2>

                  {/* Retry Button for failed result image */}
                  {imageLoadError && (
                    <div className="text-center">
                      <button
                        onClick={() => {
                          setImageLoadError(false);
                          fetchResultImage();
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors inline-flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          ></path>
                        </svg>
                        Retry Loading Image
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="card my-5 relative h-[263px] bg-gray-800 rounded-lg overflow-hidden border border-gray-600 flex items-center justify-center">
                    {loading ? (
                      <LoadingOverlay />
                    ) : error ? (
                      <div className="text-center text-gray-400">
                        <svg
                          className="w-12 h-12 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p>Analysis Failed</p>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">
                        <svg
                          className="w-12 h-12 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        <p>Waiting for Analysis...</p>
                      </div>
                    )}
                  </div>
                  <h2 className="text-center font-bold text-white text-xl">
                    Result Picture
                  </h2>

                  {/* General Retry Button for failed analysis */}
                  {error && !loading && (
                    <div className="text-center">
                      <button
                        onClick={handleRetry}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors inline-flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          ></path>
                        </svg>
                        Retry Analysis
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Prediction Results Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <SkeletonTheme baseColor="#374151" highlightColor="#4B5563">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
                Prediction Results
              </h2>

              {loading && (
                <div className="space-y-4">
                  <Skeleton count={3} height={80} />
                </div>
              )}

              {displaySuccess &&
                displayPrediction &&
                Array.isArray(displayPrediction) && (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {displayPrediction.map((ele, idx) => {
                        const confidence = Math.round(
                          (ele.confidence || 0) * 100
                        );
                        const isHighConfidence = confidence >= 50;

                        return (
                          <div
                            className={`bg-gray-700 rounded-lg p-4 border-l-4 ${
                              isHighConfidence
                                ? "border-green-500 bg-green-900 bg-opacity-20"
                                : "border-red-500 bg-red-900 bg-opacity-20"
                            }`}
                            key={idx}
                          >
                            <div className="mb-3">
                              <h3
                                className={`font-semibold text-lg ${
                                  isHighConfidence
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                              >
                                {ele.name || `Detection ${idx + 1}`}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    isHighConfidence
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                                <span
                                  className={`text-sm font-medium ${
                                    isHighConfidence
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {confidence}% Confidence
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                              <div>
                                <span className="text-gray-400">Width:</span>
                                <span className="ml-1 text-white">
                                  {ele.width || "N/A"}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Height:</span>
                                <span className="ml-1 text-white">
                                  {ele.height || "N/A"}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">X:</span>
                                <span className="ml-1 text-white">
                                  {ele.x || "N/A"}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-400">Y:</span>
                                <span className="ml-1 text-white">
                                  {ele.y || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Download/Print Button */}
                    <div className="mt-8 text-center">
                      <button
                        type="button"
                        onClick={printDocument}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        Download PDF or Print as PDF
                      </button>
                    </div>
                  </div>
                )}

              {displaySuccess && displayPrediction === null && (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    No Predictions Available
                  </h3>
                  <p className="text-gray-400">
                    The analysis completed but no detections were found.
                  </p>
                </div>
              )}

              {error && !loading && !displaySuccess && (
                <div className="text-center py-8">
                  <div className="text-red-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-red-400 mb-2">
                    Analysis Failed
                  </h3>
                  <p className="text-gray-400 mb-4">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </SkeletonTheme>
          </div>

          {/* Original Response Section */}
          {displayOrgResponse && (
            <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Raw Response
              </h3>
              <div className="font-serif text-gray-300 whitespace-pre-wrap">
                {displayOrgResponse}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Popup */}
      <ErrorPopup
        error={showErrorPopup ? error || "An error occurred" : null}
        onClose={handleCloseError}
        onRetry={handleRetry}
        showRetry={true}
      />
    </>
  );
};

export default ResultScreen;

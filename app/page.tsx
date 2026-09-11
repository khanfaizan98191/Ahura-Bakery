// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { aliqrareview } from "./reviews";

// export default function ReviewFunnel() {
//   const [rating, setRating] = useState(0);
//   const [selectedReview, setSelectedReview] = useState("");
//   const [suggestion, setSuggestion] = useState("");
//   const [reviewsList, setReviewsList] = useState<string[]>([]);

//   const [popup, setPopup] = useState<{
//     isOpen: boolean;
//     type: "success" | "error";
//     title: string;
//     message: string;
//     onOk?: () => void;
//   }>({
//     isOpen: false,
//     type: "error",
//     title: "",
//     message: "",
//   });

//   const whatsappNumbers = ["9833433373", "8850595738"];

//   const googleDesktopLink =
//     "https://www.google.com/search?q=al+iqra+ladies+dress+jogeshwari+mumbai+reviews";

//   const googleMobileLink =
//     "https://www.google.com/search?q=al+iqra+ladies+dress+jogeshwari+mumbai+reviews";

//   // Shuffle reviews and pick only 10 on component mount / page refresh
//   useEffect(() => {
//     const shuffled = [...aliqrareview].sort(() => Math.random() - 0.5);
//     setReviewsList(shuffled.slice(0, 10));
//   }, []);

//   const showPopup = (
//     type: "success" | "error",
//     title: string,
//     message: string,
//     onOk?: () => void,
//   ) => {
//     setPopup({ isOpen: true, type, title, message, onOk });
//   };

//   const closePopup = () => {
//     const action = popup.onOk;
//     setPopup({ ...popup, isOpen: false });
//     if (action) {
//       action();
//     }
//   };

//   const handleSubmit = () => {
//     if (rating === 0) return;

//     // 1, 2, and 3 Stars -> Redirect to WhatsApp
//     if (rating <= 3) {
//       if (!suggestion.trim()) {
//         showPopup(
//           "error",
//           "Suggestion Required",
//           "Please write your suggestion so we can improve.",
//         );
//         return;
//       }

//       const message = encodeURIComponent(
//         `*Suggestion from a customer:*\n\n${suggestion}\n\n(Rating given: ${rating} Stars)`,
//       );

//       whatsappNumbers.forEach((num) => {
//         window.open(`https://wa.me/${num}?text=${message}`, "_blank");
//       });
//       return;
//     }

//     // 4 and 5 Stars -> Redirect to Google Review
//     if (!selectedReview) {
//       showPopup(
//         "error",
//         "Select a Review",
//         "Please select a review option from the list to copy.",
//       );
//       return;
//     }

//     navigator.clipboard
//       .writeText(selectedReview)
//       .then(() => {
//         showPopup(
//           "success",
//           "Review Copied! 📋",
//           "Please PASTE the copied text in the Google review box.",
//           () => {
//             const isMobile = /iPhone|iPad|iPod|Android/i.test(
//               navigator.userAgent,
//             );
//             if (isMobile) {
//               window.open(googleMobileLink, "_blank");
//             } else {
//               window.open(googleDesktopLink, "_blank");
//             }
//           },
//         );
//       })
//       .catch(() => {
//         showPopup(
//           "error",
//           "Oops!",
//           "Could not copy the text. Please try again.",
//         );
//       });
//   };

//   return (
//     <div className="min-h-screen bg-[#ddc5bb] flex flex-col items-center p-4 sm:p-6 font-sans relative">
//       {popup.isOpen && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-opacity">
//           <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl transform scale-100 transition-transform flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
//             {popup.type === "success" ? (
//               <div className="w-16 h-16 bg-[#eefcf2] text-[#166534] rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   className="w-8 h-8"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="3"
//                     d="M5 13l4 4L19 7"
//                   ></path>
//                 </svg>
//               </div>
//             ) : (
//               <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   className="w-8 h-8"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2.5"
//                     d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                   ></path>
//                 </svg>
//               </div>
//             )}

//             <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
//               {popup.title}
//             </h3>
//             <p className="text-gray-600 mb-6 text-sm sm:text-base font-medium">
//               {popup.message}
//             </p>

//             <button
//               onClick={closePopup}
//               className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base transition-colors uppercase tracking-wide ${
//                 popup.type === "success"
//                   ? "bg-[#ddc5bb] text-[#111827] hover:bg-[#c9b0a4]"
//                   : "bg-[#111827] text-white hover:bg-gray-800"
//               }`}
//             >
//               {popup.type === "success" ? "OK, Go To Google" : "Okay, Got it"}
//             </button>
//           </div>
//         </div>
//       )}

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #d1d5db;
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #ddc5bb;
//         }
//       `,
//         }}
//       />

//       <div className="lg:mt-6 w-full sm:mt-10 flex flex-col items-center text-center justify-center gap-3">
//         <div className="relative w-48 sm:w-64 h-14 sm:h-20 shadow-md border-2 border-[#ddc5bb] bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 shrink-0">
//           <Image
//             src="/al-iqra.png"
//             alt="Al Iqra Designer & Bridell Dress"
//             fill
//             sizes="(max-width: 768px) 192px, 256px"
//             style={{ objectFit: "contain" }}
//             priority
//           />
//         </div>
//       </div>

//       <div className="bg-white w-full max-w-md sm:max-w-4xl mt-6 lg:mt-8 rounded-2xl shadow-xl p-6 sm:p-8 border-t-[6px] border-[#ddc5bb]">
//         <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 lg:mb-6">
//           Rate Your Experience
//         </h2>

//         <div className="flex justify-center gap-2 sm:gap-4 mb-6">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => {
//                 setRating(star);
//                 setSelectedReview("");
//               }}
//               className="focus:outline-none transition-transform active:scale-90"
//             >
//               <svg
//                 className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-300 ${rating >= star ? "text-[#ddc5bb]" : "text-gray-200"}`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             </button>
//           ))}
//         </div>

//         {rating > 0 && rating <= 3 && (
//           <div className="mb-6">
//             <p className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm sm:text-base text-center font-medium mb-4">
//               We are sorry to hear that! Please let us know what went wrong
//               below.
//             </p>
//             <label className="block text-sm sm:text-base font-bold text-gray-700 mb-2">
//               What could we improve? (Required)
//             </label>
//             <textarea
//               rows={3}
//               className="w-full placeholder-gray-400 text-gray-800 border-2 border-gray-200 rounded-xl p-3 text-sm sm:text-base focus:ring-0 focus:border-[#ddc5bb] outline-none transition-colors custom-scrollbar"
//               placeholder="Type your suggestions here..."
//               value={suggestion}
//               onChange={(e) => setSuggestion(e.target.value)}
//             ></textarea>
//           </div>
//         )}

//         {rating >= 4 && (
//           <div className="mb-6">
//             <p className="text-sm sm:text-base font-bold text-gray-700 mb-3">
//               Select a review to copy:
//             </p>
//             <div className="flex flex-col gap-2.5 max-h-[280px] sm:max-h-[460px] overflow-y-auto pt-2 px-2 custom-scrollbar">
//               {reviewsList.map((text, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedReview(text)}
//                   className={`text-left p-3.5 sm:p-4 rounded-xl text-sm sm:text-[15px] border transition-all ${
//                     selectedReview === text
//                       ? "bg-[#eefcf2] border-[#166534] text-[#166534] font-semibold shadow-sm ring-1 ring-[#166534]"
//                       : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   {text}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         <button
//           onClick={handleSubmit}
//           disabled={rating === 0}
//           className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-[15px] sm:text-lg shadow-md transition-all uppercase tracking-wide ${
//             rating === 0
//               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//               : rating <= 3
//                 ? "bg-[#111827] text-[#ddc5bb] hover:bg-gray-800"
//                 : "bg-[#ddc5bb] text-[#5a473e] hover:bg-[#c9b0a4]"
//           }`}
//         >
//           {rating === 0
//             ? "Select Stars to Continue"
//             : rating <= 3
//               ? "Submit Suggestion via WhatsApp"
//               : "Go to Review Page"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { aliqrareview } from "./reviews";

export default function ReviewFunnel() {
  const [rating, setRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [reviewsList, setReviewsList] = useState<string[]>([]);

  const [popup, setPopup] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onOk?: () => void;
  }>({
    isOpen: false,
    type: "error",
    title: "",
    message: "",
  });

  const whatsappNumbers = ["9833433373", "8850595738"];

  const googleMobileLink =
    "https://www.google.com/search?client=ms-android-vivo-terr1-rso2&hs=66GB&sca_esv=35cfe427b01f9ce2&biw=360&bih=774&sxsrf=APpeQnvNXgQdZt1GCUy3Ye2CS-qkGsizgw:1789062203143&q=al-iqra+mens+wear+mumbai+reviews&uds=AJ5uw1_PWAOUrb1BYoNTSzMlx8HiX9gxpIg-t-6J90TTFLhsf96e99qlIbzbf6FYHU3vFwu8C6sPCEGgRkZ7WH9FD7WYxhin-RJ5TyNM6R2CatCGij1IlownfEjT8-iWT7JTM8WArRSJL0z32UtFTRbItLpyz73afzbBl7DuC60X5FALqjBmp6C4ycGgQDIn4qduVUVEvQSK-zTQxAo7W5cW4GLxDzIMsGpzZGoKwHSbwegVbJu5IWJPr_9iXpw2lNa1VCsgmpjvvy9wjWJnmVWX6LVJWXWZxzZcimfCvYxitLloqQatUlvIIhh2t2BJcLTRlDOWIQwio9rYg9jG8PID3NvZJCd9nFyw-_RZUVdcwM57NHSzWbQ&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_27VL8ipW1mvjVJIGCPDnRGaSMPPC-fV4JHPAoRVWczN8s1VQS-uflPG8Pn1CnGzzyBN69nN8NxrwY_ZMfMOJFxzJhJKjPqHaT2eUWv0DtExj5GgQg%3D%3D&sa=X&ved=2ahUKEwjhr-WIyOSWAxWUdfUHHW2UOfEQk8gLegQIGRAB&ictx=1#ebo=2";

  const googleDesktopLink =
    "https://www.google.com/search?q=al+iqraa+mens+wear&oq=al+iqraa+mens+wear&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB7SAQg0NTM4ajBqN6gCCLACAfEFuzayWajLvZg&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x3be7b75a532299f7:0xc33c25fbfa1fb8e0,3";

  // Shuffle reviews and pick only a random 10 on component mount / page refresh
  useEffect(() => {
    const shuffled = [...aliqrareview].sort(() => Math.random() - 0.5);
    setReviewsList(shuffled.slice(0, 10));
  }, []);

  const showPopup = (
    type: "success" | "error",
    title: string,
    message: string,
    onOk?: () => void,
  ) => {
    setPopup({ isOpen: true, type, title, message, onOk });
  };

  const closePopup = () => {
    const action = popup.onOk;
    setPopup({ ...popup, isOpen: false });
    if (action) {
      action();
    }
  };

  const handleSubmit = () => {
    if (rating === 0) return;

    // 1, 2, and 3 Stars -> Redirect to WhatsApp
    if (rating <= 3) {
      if (!suggestion.trim()) {
        showPopup(
          "error",
          "Suggestion Required",
          "Please write your suggestion so we can improve.",
        );
        return;
      }

      const message = encodeURIComponent(
        `*Suggestion from a customer:*\n\n${suggestion}\n\n(Rating given: ${rating} Stars)`,
      );

      whatsappNumbers.forEach((num) => {
        window.open(`https://wa.me/${num}?text=${message}`, "_blank");
      });
      return;
    }

    // 4 and 5 Stars -> Redirect to Google Review
    if (!selectedReview) {
      showPopup(
        "error",
        "Select a Review",
        "Please select a review option from the list to copy.",
      );
      return;
    }

    navigator.clipboard
      .writeText(selectedReview)
      .then(() => {
        showPopup(
          "success",
          "Review Copied! 📋",
          "Please PASTE the copied text in the Google review box.",
          () => {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(
              navigator.userAgent,
            );
            if (isMobile) {
              window.open(googleMobileLink, "_blank");
            } else {
              window.open(googleDesktopLink, "_blank");
            }
          },
        );
      })
      .catch(() => {
        showPopup(
          "error",
          "Oops!",
          "Could not copy the text. Please try again.",
        );
      });
  };

  return (
    <div className="min-h-screen bg-[#ddc5bb] flex flex-col items-center p-4 sm:p-6 font-sans relative">
      {popup.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl transform scale-100 transition-transform flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            {popup.type === "success" ? (
              <div className="w-16 h-16 bg-[#eefcf2] text-[#166534] rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>
            )}

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {popup.title}
            </h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base font-medium">
              {popup.message}
            </p>

            <button
              onClick={closePopup}
              className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base transition-colors uppercase tracking-wide ${
                popup.type === "success"
                  ? "bg-[#ddc5bb] text-[#111827] hover:bg-[#c9b0a4]"
                  : "bg-[#111827] text-white hover:bg-gray-800"
              }`}
            >
              {popup.type === "success" ? "OK, Go To Google" : "Okay, Got it"}
            </button>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ddc5bb; 
        }
      `,
        }}
      />

      <div className="lg:mt-6 w-full sm:mt-10 flex flex-col items-center text-center justify-center gap-3">
        <div className="relative w-48 sm:w-64 h-14 sm:h-20 shadow-md border-2 border-[#ddc5bb] bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 shrink-0">
          <Image
            src="/al-iqra.png"
            alt="Al Iqra Designer & Bridell Dress"
            fill
            sizes="(max-width: 768px) 192px, 256px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      <div className="bg-white w-full max-w-md sm:max-w-4xl mt-6 lg:mt-8 rounded-2xl shadow-xl p-6 sm:p-8 border-t-[6px] border-[#ddc5bb]">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 lg:mb-6">
          Rate Your Experience
        </h2>

        <div className="flex justify-center gap-2 sm:gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                setRating(star);
                setSelectedReview("");
              }}
              className="focus:outline-none transition-transform active:scale-90"
            >
              <svg
                className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-300 ${rating >= star ? "text-[#ddc5bb]" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>

        {rating > 0 && rating <= 3 && (
          <div className="mb-6">
            <p className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm sm:text-base text-center font-medium mb-4">
              We are sorry to hear that! Please let us know what went wrong
              below.
            </p>
            <label className="block text-sm sm:text-base font-bold text-gray-700 mb-2">
              What could we improve? (Required)
            </label>
            <textarea
              rows={3}
              className="w-full placeholder-gray-400 text-gray-800 border-2 border-gray-200 rounded-xl p-3 text-sm sm:text-base focus:ring-0 focus:border-[#ddc5bb] outline-none transition-colors custom-scrollbar"
              placeholder="Type your suggestions here..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            ></textarea>
          </div>
        )}

        {rating >= 4 && (
          <div className="mb-6">
            <p className="text-sm sm:text-base font-bold text-gray-700 mb-3">
              Select a review to copy:
            </p>
            <div className="flex flex-col gap-2.5 max-h-[280px] sm:max-h-[460px] overflow-y-auto pt-2 px-2 custom-scrollbar">
              {reviewsList.map((text, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedReview(text)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl text-sm sm:text-[15px] border transition-all ${
                    selectedReview === text
                      ? "bg-[#eefcf2] border-[#166534] text-[#166534] font-semibold shadow-sm ring-1 ring-[#166534]"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-[15px] sm:text-lg shadow-md transition-all uppercase tracking-wide ${
            rating === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : rating <= 3
                ? "bg-[#111827] text-[#ddc5bb] hover:bg-gray-800"
                : "bg-[#ddc5bb] text-[#5a473e] hover:bg-[#c9b0a4]"
          }`}
        >
          {rating === 0
            ? "Select Stars to Continue"
            : rating <= 3
              ? "Submit Suggestion via WhatsApp"
              : "Go to Review Page"}
        </button>
      </div>
    </div>
  );
}

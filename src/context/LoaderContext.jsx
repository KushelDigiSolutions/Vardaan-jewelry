"use client";
import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export default function LoaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loaingMess, setLoadingMess] = useState("");

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };
  // console.log(isLoading)

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {isLoading && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black/40  z-[9999] text-center"
          role="alert"
          aria-busy="true"
        >
          <div className="   flex flex-col items-center  w-full mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07512E] mx-auto  mb-4"></div>
            {/* <p className="text-gray-600 font-medium tracking-wide text-sm">
      Retrieving fine jewelry items...
    </p> */}
          </div>
        </div>

        //   <div className=" fixed flex flex-col top-0 left-0 min-h-screen  items-center justify-center  w-full z-[9999] text-center py-20">
        //     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#07512E] mx-auto mb-4"></div>
        //     <p className="text-gray-500 font-sans">
        //       Retrieving fine jewelry items...
        //     </p>
        //   </div>
      )}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const loader = useContext(LoaderContext);
  if (!loader) {
    throw new Error("useLoader must be used within a LoaderContext");
  }
  return loader;
}

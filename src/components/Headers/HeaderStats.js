import React from "react";

// components


export default function HeaderStats({ buttonText, onClick, showButton }) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full"> 
          {showButton && (         
            <button onClick={onClick} className="bg-emerald-500 text-white active:bg-emerald-600 font-bold rounded-full uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

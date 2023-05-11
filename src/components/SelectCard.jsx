import React from "react";

const SelectCard = ({ title, description }) => {
  return (
    <>
      <a href="" className="group relative block h-screen max-h-[80vh]">
        <span className="absolute inset-0 border-2 border-dashed border-blue"></span>

        <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className=" transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
            <h2 className="mt-4 text-xl font-medium sm:text-2xl">{title}</h2>
          </div>

          <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
            <h3 className="mt-4 text-xl font-medium sm:text-2xl">{title}</h3>

            <p className="mt-4 text-sm sm:text-base">{description}</p>

            <p className="mt-8 font-bold">Find Tickets</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default SelectCard;
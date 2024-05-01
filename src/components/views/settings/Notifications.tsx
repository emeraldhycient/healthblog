import React from "react";

export const Notifications = () => {
  return (
    <div className="flex flex-col gap-8 mt-10 max-w-3xl">
      <div>
        <h2 className="text-xl">Article Recommendations</h2>
        <div className="mt-10 flex flex-row justify-between border-b border-borderColor pb-4">
          <div>
            <h3 className="font-medium">Recommended Reading</h3>
            <p className="text-gray text-xs md:text-sm mt-2">
              Featured stories, columns, and collections that we think you’ll
              enjoy based on your reading history.
            </p>
          </div>
          <label className="self-center">
            <input type="checkbox" className="form-checkbox" />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-xl mb-5">Take control of the contents you want</h2>
        <div className="flex flex-row justify-between">
          <p className=" text-sm mt-2">Empowerment & Control</p>
          <label className="self-center">
            <input type="checkbox" className="form-checkbox" />
          </label>
        </div>
        <div className="flex flex-row justify-between">
          <p className=" text-sm mt-2">Lifestyle & Wellness</p>
          <label className="self-center">
            <input type="checkbox" className="form-checkbox" />
          </label>
        </div>
        <div className="flex flex-row justify-between">
          <p className=" text-sm mt-2">Creative & Engaging Formats</p>
          <label className="self-center">
            <input type="checkbox" className="form-checkbox" />
          </label>
        </div>
      </div>
    </div>
  );
};

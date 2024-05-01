import { ArrowRightUpIcon } from "@src/components/icons";
import React, { useState } from "react";
import { UpdatePassword } from "..";

export const Security = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionChange = (section: React.SetStateAction<string>) => {
    setActiveSection(section);
  };

  const handleUpdateInfo = () => {
    setActiveSection("");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "updatePassword":
        return <UpdatePassword handleUpdateInfo={handleUpdateInfo} />;
      default:
        return null;
    }
  };
  return (
    <>
      {activeSection == "" && (
        <>
          <div className="flex max-w-2xl flex-row mt-10 pb-3 justify-between border-b border-borderColor">
            <div>
              <h2>Change Password</h2>
              <p className="text-gray text-sm">
                Manage account security settings
              </p>
            </div>
            <p
              className="text-sm text-blue cursor-pointer self-center"
              onClick={() => handleSectionChange("updatePassword")}
            >
              Change Password
            </p>
          </div>
          <div className="flex max-w-2xl flex-row mt-10 pb-5 justify-between border-b border-borderColor">
            <div>
              <h2>Phone Number</h2>
              <p className="text-gray text-sm">
                Manage mobile number for verification
              </p>
            </div>
            <p className="text-gray text-sm">*****6808</p>
          </div>
          <div className="flex max-w-2xl flex-row mt-10 pb-5 justify-between border-b border-borderColor">
            <div>
              <h2>Email Address</h2>
              <p className="text-gray text-sm">
                Manage email address for verification
              </p>
            </div>
            <p className="text-gray text-sm">dom*****@gmail.com</p>
          </div>
          <div className="flex max-w-2xl flex-row mt-10 pb-5 justify-between border-b border-borderColor">
            <div>
              <h2>Connect LinkedIn</h2>
              <p className="text-gray text-sm">
                We will never post to LinkedIn or message your followers without
                your permission.
              </p>
            </div>
            <ArrowRightUpIcon />
          </div>
        </>
      )}
      {renderContent()}
    </>
  );
};

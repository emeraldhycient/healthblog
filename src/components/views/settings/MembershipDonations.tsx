import { ArrowRightUpIcon } from "@src/components/icons";
import React, { useState } from "react";
import { Donation } from "./children/Donation";

export const MembershipDonations = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionChange = (section: React.SetStateAction<string>) => {
    setActiveSection(section);
  };

  const handleUpdateInfo = () => {
    setActiveSection("");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "donation":
        return <Donation handleUpdateInfo={handleUpdateInfo} />;
      default:
        return null;
    }
  };
  return (
    <div>
      {activeSection == "" && (
        <div className="flex max-w-2xl flex-row mt-10 pb-5 justify-between border-b border-borderColor">
          <div>
            <h2>Donate for unlimited access</h2>
            <p className="text-gray text-sm">
              Donate for unlimited access to the smartest writers and biggest
              ideas on Phred.
            </p>
          </div>
          <ArrowRightUpIcon onClick={() => handleSectionChange("donation")} />
        </div>
      )}
      {renderContent()}
    </div>
  );
};

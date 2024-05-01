import { useAuthStore } from "@src/lib/state";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EditProfile } from "..";

export const Account = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionChange = (section: React.SetStateAction<string>) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "editProfile":
        return <EditProfile />;
      default:
        return null;
    }
  };

  const { username, fullname } = useAuthStore();

  return (
    <div>
      {activeSection === "" && (
        <div className="flex flex-col gap-8 max-w-3xl">
          <div className="flex flex-row mt-10 pb-5 justify-between border-b border-borderColor">
            <h2>Username & Subdomain</h2>
            <p className="text-blue">@{username}</p>
          </div>
          <div className="flex flex-row justify-between pb-5 border-b border-borderColor">
            {/* Edit Profile Section */}
            <div>
              <h2>Bank Account</h2>
            </div>
            <div className="flex flex-row whitespace-nowrap">
              {/* <img
                src="https://plus.unsplash.com/premium_photo-1706430115968-e4524fc70835?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="user"
                className="w-8 h-8 md:w-10 md:h-10 mr-3 rounded-full"
              /> */}
              <div className="flex flex-col">
                {/* <h3>{fullname}</h3> */}
                <Link
                  className="text-sm text-blue cursor-pointer"
                  to="/account-details"
                >
                  Edit Account
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between pb-5 border-b border-borderColor">
            {/* Edit Profile Section */}
            <div>
              <h2>Profile Information</h2>
              <p className="text-sm text-gray mt-2">
                Edit your photo, name, bio, e.t.c
              </p>
            </div>
            <div className="flex flex-row whitespace-nowrap">
              <img
                src="https://plus.unsplash.com/premium_photo-1706430115968-e4524fc70835?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="user"
                className="w-8 h-8 md:w-10 md:h-10 mr-3 rounded-full"
              />
              <div className="flex flex-col">
                <h3>{fullname}</h3>
                <p
                  className="text-sm text-blue cursor-pointer"
                  onClick={() => handleSectionChange("editProfile")}
                >
                  Edit Profile
                </p>
              </div>
            </div>
          </div>
          {/* Deactivate Account Section */}
          <div className="flex flex-col">
            <h2
              className="text-red-500 cursor-pointer"
              onClick={() => handleSectionChange("deactivateAccount")}
            >
              Deactivate Account
            </h2>
            <p className="text-sm text-gray">
              Deactivating will suspend your account until you sign back in.
            </p>
          </div>
          {/* Delete Account Section */}
          <div className="flex flex-col">
            <h2
              className="text-red-500 cursor-pointer"
              onClick={() => handleSectionChange("deleteAccount")}
            >
              Delete Account
            </h2>
            <p className="text-sm text-gray">
              Permanently delete your account and all of your articles.
            </p>
          </div>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

import { Tabs } from "@src/components/ui";
import {
  Account,
  MembershipDonations,
  Notifications,
  Security,
} from "@src/components/views";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TabValues = "settings" | "notification" | "donation" | "security";

export const AccountSettings = () => {
  const [tabValue, setTabValue] = useState<TabValues>("settings");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleValueChange = (value: string) => {
    setTabValue(value as TabValues);
    navigate("/account/" + value);
  };

  useEffect(() => {
    const tab = pathname.split("/")[2];
    if (["settings", "notification", "donation", "security"].includes(tab)) {
      setTabValue(tab as TabValues);
    }
  }, [pathname]);
  return (
    <div className="lg:px-16 px-4 md:mt-7">
      <h1 className="text-3xl md:visible invisible font-medium">Settings</h1>
      <Tabs.Root
        className="flex flex-col gap-8 mt-8"
        value={tabValue}
        defaultValue="settings"
        onValueChange={handleValueChange}
      >
        <Tabs.List className="shrink-0 flex" aria-label="Manage your account">
          <Tabs.Trigger
            className="px-5 h-[45px] flex items-center justify-center text-base text-gray leading-none border-b-2 border-transparent  data-[state=active]:text-foreground data-[state=active]:border-blue outline-none cursor-pointer"
            value="settings"
          >
            Account Settings
          </Tabs.Trigger>
          <Tabs.Trigger
            className="px-5 h-[45px] flex items-center justify-center text-base  text-gray leading-none border-b-2 border-transparent  data-[state=active]:text-foreground data-[state=active]:border-blue outline-none cursor-pointer"
            value="notification"
          >
            Notification
          </Tabs.Trigger>
          <Tabs.Trigger
            className="px-5 h-[45px] flex items-center justify-center text-base text-gray leading-none border-b-2 border-transparent  data-[state=active]:text-foreground data-[state=active]:border-blue outline-none cursor-pointer"
            value="donation"
          >
            Donation
          </Tabs.Trigger>
          <Tabs.Trigger
            className="px-5 h-[45px] flex items-center justify-center text-base  text-gray leading-none border-b-2 border-transparent data-[state=active]:text-foreground data-[state=active]:border-blue outline-none cursor-pointer"
            value="security"
          >
            Security
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="settings">
          <Account />
        </Tabs.Content>
        <Tabs.Content value="notification">
          <Notifications />
        </Tabs.Content>
        <Tabs.Content value="donation">
          <MembershipDonations />
        </Tabs.Content>
        <Tabs.Content value="security">
          <Security />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

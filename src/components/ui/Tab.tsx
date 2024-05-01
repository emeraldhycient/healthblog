import { TabContents } from "@src/types";
import React from "react";

interface TabProps {
  tab: keyof TabContents;
  activeTab: keyof TabContents;
  setActiveTab: React.Dispatch<React.SetStateAction<keyof TabContents>>;
  label: string;
}

export const Tab: React.FC<TabProps> = ({
  tab,
  activeTab,
  setActiveTab,
  label,
}) => (
  <div
    className={`cursor-pointer mr-4 capitalize tab-item ${
      activeTab === tab ? "text-blue-500 border-b-2 border-blue-500" : ""
    }`}
    onClick={() => setActiveTab(tab)}
  >
    {label}
  </div>
);

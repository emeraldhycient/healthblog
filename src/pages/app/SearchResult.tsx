import React, { useState } from "react";
import {
  ArticleCard,
  ExploreSearchResultCard,
  JobCard,
  PeopleSearchResultCard,
} from "@src/components/ui";
import articleBig from "@src/assets/images/article-big.png";

export const SearchResult = () => {
  const [activeTab, setActiveTab] = useState("articles");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-10">
      <div
        id="search tabs"
        className="flex bg-blue-500 px-5 py-2 gap-5 md:px-16 lg:px-16"
      >
        <div
          className={`cursor-pointer py-2 rounded-full px-5 ${
            activeTab === "articles"
              ? "bg-blue text-white"
              : "bg-pale text-black"
          }`}
          onClick={() => handleTabClick("articles")}
        >
          Explore Posts
        </div>
        <div
          className={`cursor-pointer  py-2 rounded-full px-5 ${
            activeTab === "jobs" ? "bg-blue text-white" : "bg-pale text-black"
          }`}
          onClick={() => handleTabClick("jobs")}
        >
          Jobs
        </div>
        <div
          className={`cursor-pointer rounded-full  py-2 px-5 ${
            activeTab === "people" ? "bg-blue text-white" : "bg-pale text-black"
          }`}
          onClick={() => handleTabClick("people")}
        >
          People
        </div>
      </div>
      <div className="flex px-4 py-5 md:px-16 lg:px-16 flex-col lg:flex-row">
        {activeTab === "articles" && (
          <>
            <div className="lg:max-w-[55vw]">
              <ArticleCard
                url="article-details"
                imageUrl={articleBig}
                authorName="Great Ihevueme"
                authorUsername="greatkene"
                title="Top Analyst Unveils Malaria Catalyst That Could Trigger nearly 50% Surge for Africa. Here’s His Outlook."
                category={[
                  { name: "Health", color: "purple" },
                  { name: "Development", color: "yellow" },
                ]}
                isBig
                isDescription
                description='A leading malaria expert has sent shockwaves through the medical community with the revelation of a potential "game-changer" in the fight against the disease. This groundbreaking development dubbed a malaria catalyst'
              />
            </div>
            <div className="lg:ml-16 mt-5 flex flex-col gap-4 lg:mt-0">
              <ExploreSearchResultCard />
              <ExploreSearchResultCard />
              <ExploreSearchResultCard />
            </div>
          </>
        )}
        {activeTab == "jobs" && (
          <div className="mt-5 flex flex-col gap-4 lg:mt-0">
            <h2 className="mb-3 font-medium">Job Search Results</h2>
            <JobCard />
          </div>
        )}
        {activeTab == "people" && (
          <div className=" mt-5 flex flex-col gap-4 lg:mt-0">
            <PeopleSearchResultCard />
            <PeopleSearchResultCard />
            <PeopleSearchResultCard />
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "@src/components/icons";
import { ArticleCard, Button } from "@src/components/ui";
import MessageIcon from "@src/assets/images/message-icon.svg";
import VerifiedIcon from "@src/assets/images/verified.svg";
import { followers } from "@src/constants/data";
import { useAuthStore } from "@src/lib/state";

interface TabContents {
  articles: React.ReactNode;
  webinars: React.ReactNode;
  about: React.ReactNode;
}

interface TabProps {
  tab: keyof TabContents;
  activeTab: keyof TabContents;
  setActiveTab: React.Dispatch<React.SetStateAction<keyof TabContents>>;
  label: string;
}

const Tab: React.FC<TabProps> = ({ tab, activeTab, setActiveTab, label }) => (
  <div
    className={`cursor-pointer mr-4 ${
      activeTab === tab ? "text-blue-500 border-b-2 border-blue-500" : ""
    }`}
    onClick={() => setActiveTab(tab)}
  >
    {label}
  </div>
);

interface FollowerProps {
  follower: {
    id: string | number;
    avatar: string;
    fullname: string | null;
    username: string | null;
  };
}

const Follower: React.FC<FollowerProps> = ({ follower }) => (
  <div key={follower.id} className="flex flex-row mt-3 justify-between">
    <div className="flex whitespace-nowrap items-center md:mb-4">
      <img
        src={follower.avatar}
        alt="user"
        className="w-8 h-8 md:w-10 md:h-10 mr-3 rounded-full"
      />
      <div>
        <p className="text-[12px] md:text-sm font-medium">
          {follower.fullname}
        </p>
        <p className="text-[12px] md:text-sm text-gray">@{follower.username}</p>
      </div>
    </div>
    <Icons.DotIcon size={18} />
  </div>
);

export const Profile = () => {
  const [activeTab, setActiveTab] = useState<keyof TabContents>("articles");
  const { username, fullname, totalArticles } = useAuthStore();

  const tabContents: TabContents = {
    articles: (
      <div className="flex mt-[2rem] flex-col md:flex-row md:w-30 space-y-6 md:space-y-0 md:space-x-6">
        <ArticleCard
          url="article-details"
          imageUrl="https://plus.unsplash.com/premium_photo-1707413391465-82ac03dd5555?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          authorName={fullname}
          authorUsername={username}
          title="Noteworthy technology acquisitions 2021"
          isSmall
        />
        {/* Card 2 */}
        <ArticleCard
          url="article-details"
          imageUrl="https://plus.unsplash.com/premium_photo-1706430115968-e4524fc70835?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          authorName={fullname}
          authorUsername={username}
          title="Noteworthy technology acquisitions 2021"
          isSmall
        />
      </div>
    ),
    webinars: (
      <div className="mt-10">
        <h1 className="font-medium text-lg">Coming Soon</h1>
      </div>
    ),
    about: (
      <div className="flex mt-[2rem] flex-col md:flex-row md:w-30 space-y-6 md:space-y-0 md:space-x-6">
        <ArticleCard
          url="article-details"
          imageUrl="https://plus.unsplash.com/premium_photo-1707413391465-82ac03dd5555?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          authorName={fullname}
          authorUsername={username}
          title="This is About"
          isSmall
        />
        {/* Card 2 */}
        <ArticleCard
          url="article-details"
          imageUrl="https://plus.unsplash.com/premium_photo-1706430115968-e4524fc70835?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          authorName={fullname}
          authorUsername={username}
          title="This tab is about"
          isSmall
        />
      </div>
    ),
  };

  return (
    <div className="grid lg:grid-cols-3 md:px-16 px-4 pb-20 mt-5">
      <div className="col-span-2 md:col-span-3 lg:col-span-2 md:pr-10 lg:border-r md:-mt-5 border-gray h-[100%]">
        <div className="md:mt-5 md:order-first">
          <h1 className="text-3xl md:visible invisible font-medium">
            {fullname}
          </h1>
          <div className="flex mt-10 gap-5">
            <Tab
              tab="articles"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              label="Articles"
            />
            <Tab
              tab="webinars"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              label="Webinars"
            />
            <Tab
              tab="about"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              label="About"
            />
          </div>
          {tabContents[activeTab]}
        </div>
      </div>

      <div
        className="flex flex-col gap-4 md:px-5 order-first md:order-2"
        id="user-profile"
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/profile-fb-1526640523-72455d00636e.jpg?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            alt="user"
            className="w-12 h-12 md:w-14 md:h-14 mr-3 rounded-full"
          />
          <span className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center bottom-[14%] right-[91%] md:right-[88%] translate-x-2/4 translate-y-2/4  min-w-[24px] min-h-[24px]">
            <img src={VerifiedIcon} />
          </span>
        </div>
        <div>
          <h3 className="font-medium">{fullname}</h3>
          <p className="text-gray">73k Followers</p>
        </div>
        <p>
          Dominic’s case studies to help doctors, & health practitioners to
          learn from what’s happening around & curate better experiences for
          their patients.
        </p>
        <div className="flex flex-row gap-4 text-white">
          <div className="bg-purple whitespace-nowrap text-sm md:text-base flex flex-row py-3 px-4 gap-1 rounded-full">
            <Icons.MedalIcon />
            <p className="text-[14px]">{`${totalArticles} Articles`}</p>
          </div>
          <div className="bg-orange whitespace-nowrap text-sm md:text-base py-3 px-4 flex flex-row gap-1 rounded-full">
            <Icons.MedalStarIcon />
            <p>130 Post Reviewed</p>
          </div>
        </div>
        <div className="flex whitespace-nowrap flex-row gap-4">
          <Button variant="outline">Following</Button>
          <img src={MessageIcon} />
        </div>
      </div>

      <div
        id="followers"
        className="order-2 md:px-5 mt-5 lg:order-3 lg:relative lg:self-end lg:left-[200%] lg:-top-[65%]"
      >
        <div
          id="followers-header"
          className="flex-row justify-between flex mb-5 mt-3"
        >
          <h3 className="font-medium">Following List</h3>
          <Link className="text-gray" to={"/all"}>
            View All
          </Link>
        </div>
        {followers.map((follower) => (
          <Follower key={follower.id} follower={follower} />
        ))}
        <p className="text-base text-gray mt-3">See all (1.3K)</p>
      </div>
    </div>
  );
};

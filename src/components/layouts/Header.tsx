// @ts-nocheck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BellIcon, Logo, MsgIcon, SearchIcon, StoreIcon } from "../icons/Icon";
import { Button } from "../ui";
import { Avatar, Dropdown } from "flowbite-react";
import { useAuthStore } from "@src/lib/state/store";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineForum } from "react-icons/md";

interface HeaderProps {
  isAuthPage?: boolean;
  targetUrl?: string;
  authHeaderTitle?: string;
  authBtnTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthPage,
  targetUrl,
  authHeaderTitle,
  authBtnTitle,
}) => {
  const borderBottomClass = isAuthPage
    ? "md:border-b md:border-borderColor"
    : "";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("");

  const {
    isLoggedIn,
    username,
    fullname,
    logout,
    isVerified,
    verification_status,
  } = useAuthStore();
  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      if (isVerified) {
        navigate("/write-post");
        setCurrentPage("/write-post");
      } else if (!isVerified && verification_status === "PENDING") {
        navigate("/verify-pending");
      } else {
        navigate("/verify-account");
      }
    } else {
      navigate(targetUrl || "/login");
    }
  };
  const getInitial = (str: string) => str.charAt(0).toUpperCase();

  const getButtonText = () => {
    if (isLoggedIn && currentPage === "/write-post") {
      return "Publish Now";
    } else {
      return isLoggedIn ? "Write" : !authBtnTitle ? "Login" : authBtnTitle;
    }
  };

  const handlePublishNowClick = () => {
    navigate("/publish-confirmation");
  };

  return (
    <nav
      className={`p-4 md:px-16 ${borderBottomClass} sticky top-0 left-0 w-full z-50 bg-white`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <Logo />
          </Link>
          {/* Search bar */}
          {!isAuthPage && isLoggedIn && (
            <div className="ml-4 lg:ml-12 hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-pale px-10 text-sm py-[.8rem] rounded-full pl-14"
                />
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-8">
          {isAuthPage && (
            <p className={`text-dark hidden md:inline mr-5`}>
              {authHeaderTitle}
            </p>
          )}
          {!isAuthPage && isLoggedIn && (
            <>
              <SearchIcon className="md:hidden" />
              
              <Link className="md:hidden" to="/forum">
                <MsgIcon />
              </Link>
              <Link className="hidden md:block" to="/forum">
                <h6 className="font-medium text-sm border border-transparent hover:border hover:border-slate-200 inline-flex justify-center items-center gap-2 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600  text-slate-500 rounded-3xl py-2.5 px-3 ">Forum</h6>
              </Link>
              <Link className="hidden md:block" to="/articles">
                <h6 className="font-medium text-sm border border-transparent hover:border hover:border-slate-200 inline-flex justify-center items-center gap-2 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600  text-slate-500 rounded-3xl py-2.5 px-3 ">Articles</h6>
              </Link>
              <Button
                onClick={
                  getButtonText() === "Publish Now" && currentPage === "/write-post"
                    ? handlePublishNowClick
                    : handleGetStartedClick
                }
                className={`text-[12px] ${isLoggedIn ? "hidden" : "block"
                  } md:inline md:text-sm px-7`}
                isPaleBgMobile
              >

                {getButtonText() === "Write" ? <div className="flex items-center"><LuPencilLine className="text-white mr-2" />{getButtonText()}</div> : getButtonText()}
              </Button>
              <div className="relative inline-flex w-fit">
                <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-[#FF3333] px-2 py-1 text-center align-baseline text-xs leading-none text-white">
                  9
                </div>
                <BellIcon />
              </div>
              <div>
                <Dropdown
                  arrowIcon={false}
                  className="border-0 rounded-lg"
                  placement="top"
                  inline
                  size="lg"
                  label={
                    <div className="relative">
                      <div className="w-8 h-8 md:w-10 md:h-10 mr-3 rounded-full flex items-center justify-center bg-blue text-white font-medium">
                        {getInitial(fullname)}
                      </div>

                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </div>
                  }
                >
                  <Dropdown.Header className="flex border-b border-borderColor">
                    {/* <Avatar
                      alt="User settings"
                      img="https://images.unsplash.com/profile-fb-1526640523-72455d00636e.jpg?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                      rounded
                    /> */}
                    <div className="w-8 h-8 md:w-10 md:h-10 mr-3 rounded-full flex items-center justify-center bg-blue text-white font-medium">
                      {getInitial(fullname)}
                    </div>

                    <div className="ml-3">
                      <span className="block text-sm">{fullname}</span>
                      <span className="block truncate text-sm text-gray">
                        @{username}
                      </span>
                    </div>
                  </Dropdown.Header>
                  <Dropdown.Item>
                    <Link to="/write-post">Write a Post</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={`/account-profile/${username}`}>
                      View Profile
                    </Link>
                  </Dropdown.Item>
                  {/* <Dropdown.Item>
                    <Link to="/forum">Forum</Link>
                  </Dropdown.Item> */}
                  <Dropdown.Item>
                    <Link to={`/articles`}>Articles</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/add-advert">Add Advert</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/create-job">Add a Job Listing</Link>
                  </Dropdown.Item>
                  <hr className="border-borderColor" />
                  <Dropdown.Item>
                    <Link to="/donation-plan">Manage Donation</Link>
                  </Dropdown.Item>
                  <hr className="border-borderColor" />
                  <Dropdown.Item>
                    <Link to="/account">Account Settings</Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>{" "}
                  {/* Added onClick handler */}
                </Dropdown>
              </div>
             
            </>
          )}
          
        </div>
      </div>
    </nav>
  );
};

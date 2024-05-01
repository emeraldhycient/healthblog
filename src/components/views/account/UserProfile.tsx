import React from "react";
import VerifiedIcon from "@src/assets/images/verified.svg";
import { Button } from "@src/components/ui";
import { Link } from "react-router-dom";
import { Eye } from "@src/components/icons";
import { useAuthStore } from "@src/lib/state";
import * as Icons from "@src/components/icons";
import { formatPrice } from "@src/lib/utils";
import MessageIcon from "@src/assets/images/message-icon.svg";
import { useToggleFollow } from "@src/services/queries";

interface UserProfileProps {
  toggleBalanceVisibility?: () => void;
  showBalance?: boolean;
  isMobile: boolean;
  isUserProfile?: boolean;
  showUserStat?: boolean;
  fullname?: string;
  isLoggedInUser?: boolean;
  userId?: string | undefined;
  hasFollowed?: boolean;
  totalArticles?: number | undefined;
  bio?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  toggleBalanceVisibility,
  showBalance,
  isMobile,
  isUserProfile,
  showUserStat,
  fullname,
  isLoggedInUser,
  userId,
  hasFollowed,
  totalArticles,
  bio,
}) => {
  const { earnings, followersLength } = useAuthStore();
  const { mutate: toggleFollow, isPending: togglePending } = useToggleFollow();

  const handleToggleFollow = async () => {
    toggleFollow(userId);
  };

  return (
    <div
      className={`flex-col gap-4 ${
        isMobile ? "flex lg:hidden" : "hidden lg:flex"
      } md:px-0`}
      id="user-profile"
    >
      <div className="flex flex-row justify-between">
        <div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/profile-fb-1526640523-72455d00636e.jpg?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="user"
              className="w-12 h-12 md:w-14 md:h-14 mr-3 rounded-full"
            />
            <span className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center bottom-[14%] right-[65%] md:right-[60%] translate-x-2/4 translate-y-2/4  min-w-[24px] min-h-[24px]">
              <img src={VerifiedIcon} alt="verified" />
            </span>
          </div>
          <div className="mt-5">
            <h3 className="font-medium">{fullname}</h3>
            <p className="text-gray">{`${followersLength} Followers`}</p>
          </div>
        </div>

        {isUserProfile && isLoggedInUser && (
          <div className="mt-1.8 md:hidden">
            <div className="flex flex-row  justify-between gap-2">
              <h4>Earning Balance</h4>
              <Eye
                stroke="#0A66C2"
                onClick={toggleBalanceVisibility}
                style={{ cursor: "pointer" }}
              />
            </div>
            <h3 className="text-lg font-medium mt-2">
              {showBalance ? formatPrice(earnings) : "**********"}
            </h3>
          </div>
        )}
      </div>
      <p className="text-sm md:text-base">{bio && bio}</p>
      {showUserStat && (
        <div className="flex flex-row gap-4 text-white">
          <div className="bg-purple whitespace-nowrap text-sm md:text-base flex flex-row py-3 px-4 gap-1 rounded-full">
            <Icons.MedalIcon size={18} />
            <p className="text-[14px]">{`${totalArticles} Articles`}</p>
          </div>
          <div className="bg-orange whitespace-nowrap text-sm md:text-base py-3 px-4 flex flex-row gap-1 rounded-full">
            <Icons.MedalStarIcon size={18} />
            <p className="text-[14px]">130 Post Reviewed</p>
          </div>
        </div>
      )}
      {isUserProfile && isLoggedInUser ? (
        <div className="flex whitespace-nowrap flex-row gap-4">
          <Button variant="outline">
            <Link to="/account/settings">Edit Profile</Link>
          </Button>
          <Button>
            <Link to={"/withdraw"}>Withdraw</Link>
          </Button>
        </div>
      ) : (
        <div className="flex whitespace-nowrap flex-row gap-4">
          <Button
            variant="outline"
            loading={togglePending}
            onClick={handleToggleFollow}
          >
            {hasFollowed ? "Following" : "Follow"}
          </Button>
          <img src={MessageIcon} />
        </div>
      )}
    </div>
  );
};

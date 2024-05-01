import { Button } from "@src/components/ui";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ForumCardProps {
  isConnectionRequest: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  title?: any;
  unReadCount?: number;
  requesterName?: string;
  forumName?: string;
  id?: string;
  description?: any;
  image?: string;
}

export const ForumChatCard: React.FC<ForumCardProps> = ({
  isConnectionRequest,
  onAccept,
  onDecline,
  title,
  unReadCount,
  forumName,
  requesterName,
  id,
  description,
  image,
}) => {
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const [isDeclineLoading, setIsDeclineLoading] = useState(false);

  const handleAccept = () => {
    setIsAcceptLoading(true);
    if (typeof onAccept === "function") {
      onAccept();
    }
  };

  const handleDecline = () => {
    setIsDeclineLoading(true);
    if (typeof onDecline === "function") {
      onDecline();
    }
  };

  const getInitial = (str: string | undefined) => str?.charAt(0).toUpperCase();

  return (
    <div className="flex flex-row justify-between border-b border-borderColor pb-4">
      {isConnectionRequest ? (
        <div className="flex flex-row justify-between gap-10">
          <div className="flex felx-row">
            {image ? (
              <img
                src={image}
                alt="user"
                className="w-12 h-12 md:w-12 md:h-12 mr-3 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 md:w-12 md:h-12 mr-3 rounded-full p-4 flex items-center justify-center bg-blue text-white font-medium">
                {getInitial(requesterName)}
              </div>
            )}

            <div className="flex flex-col">
              <h4 className="font-medium">{requesterName}</h4>
              <p className="text-gray text-sm">
                You have a connection request for {forumName}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="sm" onClick={handleAccept} loading={isAcceptLoading}>
              Accept
            </Button>
            <Button
              size="sm"
              loading={isDeclineLoading}
              variant="outline"
              onClick={handleDecline}
            >
              Decline
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Link
            to={`/forum-message/${id}?name=${encodeURIComponent(
              title
            )}&description=${encodeURIComponent(description)}`}
            className="flex flex-row justify-between w-full"
          >
            <div className="flex flex-row">
              <img
                className="w-12 h-12 md:w-12 md:h-12 mr-3 rounded-full"
                src={image}
              />
              <div className="flex flex-col">
                <h3 className="font-medium">{title}</h3>
                <p className="text-gray text-sm md:w-[45vw] mt-2">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap gap-3">
              <h4 className="text-gray text-sm">03: 18 PM</h4>
              <span className="inline-flex items-center self-end justify-center w-4 h-4 ms-2 text-xs font-semibold text-white bg-[#FF3333] rounded-full">
                {unReadCount}
              </span>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

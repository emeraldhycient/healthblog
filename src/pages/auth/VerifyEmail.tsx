import { useGetEmailToken, useResendEmailToken } from "@src/services/queries";
import React, { useEffect, useState } from "react";
import EmailIcon from "@src/assets/images/email.svg";
import { Link } from "react-router-dom";

export const VerifyEmail = () => {
  const { isSuccess, isError } = useGetEmailToken();
  const { mutate, isPending } = useResendEmailToken();
  const [showResendLink, setShowResendLink] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      setShowResendLink(false);
    }
  }, [isSuccess]);

  const handleResend = () => {
    mutate("grocedash60@gmail.com");
  };

  return (
    <div>
      {isSuccess && (
        <div className="flex mt-10 lg:mt-0 flex-col px-6 md:px-0 justify-center items-center">
          <img src={EmailIcon} alt="email icon" />
          <div className="flex gap-3 mt-5 max-w-sm flex-col justify-center items-center">
            <h2 className="font-medium text-lg">
              Email verified successfully!
            </h2>
            <p className="text-center text-gray text-sm">
              Your email was verified successfully, click the link below to
              proceed to login
            </p>
            <Link
              to="/login"
              className="bg-white text-sm border-blue border p-2 rounded-full px-6"
            >
              Proceed to login
            </Link>
          </div>
        </div>
      )}
      {isError && (
        <div className="flex mt-10 lg:mt-0 flex-col px-6 md:px-0 justify-center items-center">
          <img src={EmailIcon} alt="email icon" />
          <div className="flex gap-3 mt-5 max-w-sm flex-col justify-center items-center">
            <h2 className="font-medium text-lg">Email verification failed!</h2>
            <p className="text-center text-red-500 text-sm">
              Something went wrong, please try again, if issue persists, contact
              admin.
            </p>
            {showResendLink && (
              <button
                onClick={handleResend}
                disabled={isPending}
                className="bg-white text-sm mt-5 border-blue border p-2 rounded-full px-6"
              >
                {isPending ? "Resending" : "Resend Verification Link"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

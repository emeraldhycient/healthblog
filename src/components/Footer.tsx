import React, { useEffect } from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://embed.tawk.to/62c2cdaa7b967b117997e739/1g74f6pno";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-lightGray px-4 py-8 mt-5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                &copy; {currentYear} PhredNetwork. All Rights Reserved.
              </p>
            </div>
            <div className="text-center md:text-left mb-4 md:mb-0 ml-0 md:ml-4">
              <a
                href="/privacy"
                className="text-sm text-gray-600 hover:text-blue mr-4"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-600 hover:text-blue mr-4"
              >
                Terms & Conditions
              </a>
              <a
                href="/support"
                className="text-sm text-gray-600 hover:text-blue"
              >
                Support
              </a>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:mt-0">
            <p className="text-sm text-gray-600">
              Powered By{" "}
              <a
                href="https://thedevmechanics.com/"
                className="underline text-blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Devmechanics
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from "react";

type Props = {};

const FooterComponent = (props: Props) => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <p>
          &copy; {new Date().getFullYear()} ML Projects. All rights reserved.
        </p>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Terms of Service
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default FooterComponent;

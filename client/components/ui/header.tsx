import { FrameIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

type Props = {};

const HeaderComponent = (props: Props) => {
  return (
    <header className="bg-gray-900 text-white flex items-center justify-center h-16 px-4 border-b shrink-0 md:px-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
        prefetch={false}
      >
        <FrameIcon className="w-6 h-6" />
        <span className="">Machine Learning Projects</span>
      </Link>

      {/* <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
        <Link href="#" className="font-bold" prefetch={false}>
          Projects
        </Link>
        <Link
          href="#"
          className="text-gray-500 dark:text-gray-400"
          prefetch={false}
        >
          Insights
        </Link>
        <Link
          href="#"
          className="text-gray-500 dark:text-gray-400"
          prefetch={false}
        >
          Algorithms
        </Link>
        <Link
          href="#"
          className="text-gray-500 dark:text-gray-400"
          prefetch={false}
        >
          Datasets
        </Link>
        <Link
          href="#"
          className="text-gray-500 dark:text-gray-400"
          prefetch={false}
        >
          Settings
        </Link>
      </nav>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full ml-auto">
          <img
            src="/placeholder.svg"
            width="32"
            height="32"
            className="rounded-full border"
            alt="Avatar"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div> */}
    </header>
  );
};

export default HeaderComponent;

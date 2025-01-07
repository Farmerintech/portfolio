import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/themeContext";
import { imageIcons } from "./icons";
import { Link } from "react-router";
import image from "../assets/portfolio.jpg";
import { FiMoon, FiSun } from "react-icons/fi";

export const Header = () => {
  const { Theme, changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(Theme);
  }, [Theme]);

  const [index, setIndex] = useState<string>("home.tsx");

  return (
    <header
      className={`${
        Theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      } fixed top-0 w-full z-20`}
    >
      <div
        className={`${
          Theme === "light" ? "border-stone-50" : "border-b-gray-900"
        } flex border-b items-center`}
      >
        <img src={image} className="w-[30px] h-[30px] rounded-full" />
        <div className="flex justify-center items-center md:gap-80 px-5 w-full">
          <p
            className={`
              ${Theme === "light" ? "" : "border-gray-700"}
              my-2 rounded border md:w-1/2 bg-none outline-none text-center px-5 xs:px-0 flex items-center justify-center gap-8
            `}
            onClick={changeTheme}
          >
            {"< farmerinTech"}
            {Theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            {">"}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full z-20 absolute left-[9%] md:left-[253px]">
        <ul
          className={`${
            Theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
          } p-1 mr-5 flex justify-start gap-2 overflow-x-auto custom-scrollbar w-[90%] md:w-full`}
        >
          {imageIcons.map((image) => (
            <Link
              to={
                image.name === "home.tsx"
                  ? "/"
                  : image.name === "about.html"
                  ? "/about"
                  : image.name === "resume.js"
                  ? "/resume"
                  : image.name === "project.json"
                  ? "/projects"
                  : "github"
              }
              className={`${
                Theme === "light"
                  ? "border-white text-black"
                  : "border-gray-900 text-white"
              } ${
                index === image.name && "border-t-2 border-t-red-500"
              } md:border-r p-2`}
              onClick={() => setIndex(image.name)}
            >
              <li
                className="flex gap-2 items-center justify-start text-sm w-[150px]"
                key={image.name}
              >
                <img src={image.icon} alt={image.name} className="w-[20px]" />
                <span>{image.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
};

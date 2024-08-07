import { Sun, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeButton = () => {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    const currentTheme = theme  === "light" ? "dark" : "light"
    setTheme(currentTheme);
    localStorage.setItem("@theme", theme);
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.classList.remove("light", "dark");

      const themeNow = localStorage.getItem("@theme");

      if (themeNow) {
        htmlElement.classList.add(themeNow);
        return;
      }

      htmlElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <div
      className="flex justify-center items-center cursor-pointer h-12 w-12"
      onClick={changeTheme}
    >
      {theme === "light" ? <Sun size={24} /> : <SunMoon size={24} />}
    </div>
  );
};

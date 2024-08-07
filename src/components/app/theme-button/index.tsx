import { Sun, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeButton = () => {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.classList.remove("light", "dark");

      htmlElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className="flex justify-center items-center cursor-pointer h-12 w-12" onClick={changeTheme}>
      {theme === "light" ? <Sun size={24} /> : <SunMoon size={24} />}
    </div>
  );
};

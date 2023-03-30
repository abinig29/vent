import { useEffect, useState } from "react";

export const useInfinite = (homePage, setHomePage) => {
  const [page, setPage] = useState(homePage);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const visibleHeight = document.documentElement.clientHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollHeight = scrollY + visibleHeight;

    if (scrollHeight + 10 >= totalHeight * 0.7) {
      setPage((pre) => pre + 1);
      setHomePage((pre) => pre + 1);
    }
  };
  useEffect(() => {
    setPage(homePage);
  }, [homePage]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return { page };
};

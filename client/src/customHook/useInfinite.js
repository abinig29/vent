import { Try } from "@mui/icons-material";
import { useEffect, useState } from "react";

export const useInfinite = (type) => {
  const [page, setPage] = useState(1);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const visibleHeight = document.documentElement.clientHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollHeight = scrollY + visibleHeight;

    if (scrollHeight + 3 >= totalHeight * 0.9) {
      setPage((pre) => pre + 1);
    }
  };
  useEffect(() => {
    setPage(1);
  }, [type]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return { page };
};

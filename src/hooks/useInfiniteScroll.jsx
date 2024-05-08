import { useEffect, useCallback, useRef, useContext } from "react";
import { MyContext } from "../App";

const useInfiniteScroll = (fetchMoreData, videos, scroll) => {
  const { loading, setLoading, setProgress } = useContext(MyContext);
  const debounceTimer = useRef();

  const handleScroll = useCallback(() => {
    if (
      Math.abs(
        scroll.current.scrollHeight -
          scroll.current.clientHeight -
          scroll.current.scrollTop
      ) <= 10
    ) {
      if (!loading) {
        setLoading(true);
        setProgress(0);
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
          fetchMoreData(setLoading);
        }, 200); // Adjust the debounce time as needed
      }
    }
  }, [loading, fetchMoreData, scroll]);

  useEffect(() => {
    if (scroll.current) {
      let scrollWindow = scroll.current;
      scrollWindow.addEventListener("scroll", handleScroll);
      return () => {
        scrollWindow.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return [loading, setLoading];
};

export default useInfiniteScroll;

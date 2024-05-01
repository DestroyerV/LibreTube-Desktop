import { useState, useEffect } from "react";
const useInfiniteScroll = (fetchMoreData, videos, scroll) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        Math.abs(
          scroll.current.scrollHeight -
            scroll.current.clientHeight -
            scroll.current.scrollTop
        ) <= 10
      ) {
        if (!loading) {
          setLoading(true);
          setTimeout(() => {
            fetchMoreData();
            setLoading(false);
          }, 0);
        }
      }
    };

    if (scroll.current) {
      let scrollWindow = scroll.current;
      scrollWindow.addEventListener("scroll", handleScroll);
      return () => {
        scrollWindow.removeEventListener("scroll", handleScroll);
      };
    }
  }, [fetchMoreData, loading, scroll]);

  console.log(loading);
  console.log(videos);

  return [loading, setLoading];
};

export default useInfiniteScroll;

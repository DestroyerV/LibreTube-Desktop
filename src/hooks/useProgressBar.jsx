import { MyContext } from "../App";
import { useContext, useEffect } from "react";

const useProgressBar = () => {
  const { loading, progress, setProgress } = useContext(MyContext);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (!loading) {
            clearInterval(interval);
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(prevProgress + diff, 90);
        }, 800);
      });
    }
  }, [loading]);

  return progress;
};

export default useProgressBar;

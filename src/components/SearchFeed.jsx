import { useState, useEffect, useRef, useContext } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { Videos } from "./";
import { fetchFromAPI } from "../services/fetchFromAPI";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { MyContext } from "../App";
import theme from "../../theme";
import { filterButtons } from "../utils/constants";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const scroll = useRef(null);
  const { setProgress } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    fetchFromAPI(`search?q=${searchTerm}&filter=${filter}`)
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [searchTerm, filter]);

  const fetchMoreData = (setLoading) => {
    if (!videos?.nextpage) {
      return;
    }
    fetchFromAPI(
      `nextpage/search?nextpage=${encodeURIComponent(
        videos?.nextpage
      )}&q=${searchTerm}&filter=${filter}`
    )
      .then((data) => {
        if (!data || !data.items || !Array.isArray(data.items)) {
          throw new Error("Invalid data received");
        }
        setVideos((prev) => ({
          items: [...(prev.items ?? []), ...data.items],
          nextpage: data.nextpage,
        }));
      })
      .catch((error) => {
        console.error("Error fetching more data:", error);
      })
      .finally(() => setLoading(false));
  };

  const [loading, setLoading] = useInfiniteScroll(
    fetchMoreData,
    videos,
    scroll
  );

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }} ref={scroll}>
      <Stack
        direction='row'
        gap={2}
        justifyContent='start'
        alignItems='center'
        mb={2}
        pb={2}
        sx={{ overflowX: "auto" }}>
        <Typography variant='h6' fontWeight='bold' sx={{ color: "white" }}>
          Filters:{" "}
        </Typography>
        <Stack direction='row' gap={2}>
          {filterButtons.map((button) => (
            <Button
              onClick={() => setFilter(button?.filter)}
              key={button?.filter}
              sx={{
                color: "white",
                border: "none",
                borderRadius: "8px",
                ":hover": {
                  backgroundColor:
                    button.filter === filter
                      ? "#ff7691"
                      : "rgba(255, 255, 255, 0.1)",
                },
                height: "30px",
                whiteSpace: "nowrap",
                backgroundColor:
                  button.filter === filter
                    ? theme.palette.primary.main
                    : "rgba(255, 255, 255, 0.2)",
              }}>
              {button?.name}
            </Button>
          ))}
        </Stack>
      </Stack>
      <Videos videos={videos.items} justifyContent={"center"} />
    </Box>
  );
};

export default SearchFeed;

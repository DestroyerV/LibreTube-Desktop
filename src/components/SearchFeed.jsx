import { useState, useEffect, useRef } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const scroll = useRef(null);

  useEffect(() => {
    setLoading(true);
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

  const filterButtons = [
    { name: "All", filter: "all" },
    { name: "Videos", filter: "videos" },
    { name: "Channels", filter: "channels" },
    // { name: "Playlists", filter: "playlists" },
    // { name: "YT Music Songs", filter: "music_songs" },
    { name: "YT Music Videos", filter: "music_videos" },
    // { name: "YT Music Playlists", filter: "yt-music-playlists" },
    // { name: "YT Music Artists", filter: "music_artists" },
  ];

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }} ref={scroll}>
      <Stack
        direction='row'
        gap={2}
        justifyContent='start'
        alignItems='center'
        mb={2}
        pb={2}
        sx={{ overflowX: "auto" }}
      >
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
                    ? "#ff7691"
                    : "rgba(255, 255, 255, 0.2)",
              }}
            >
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

import { useState, useEffect } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
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
  useEffect(() => {
    fetchFromAPI(`search?q=${searchTerm}&filter=${filter}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchTerm, filter]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
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
                ":hover": { backgroundColor: button.filter === filter
                  ? "#ff7691" : "rgba(255, 255, 255, 0.1)" },
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
      <Videos videos={videos} justifyContent={"center"} />
    </Box>
  );
};

export default SearchFeed;

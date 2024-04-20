import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (selectedCategory === "Trending") {
      fetchFromAPI("trending").then((data) => setVideos(data));
    } else {
      fetchFromAPI(`search?q=${selectedCategory}&filter=all`).then((data) =>
        setVideos(data.items)
      );
    }
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sm: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant='h4'
          fontWeight='bold'
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#ff7691" }}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;

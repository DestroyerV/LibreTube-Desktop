import { useState, useEffect, useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "./";
import { fetchFromAPI } from "../services/fetchFromAPI";
import { MyContext } from "../App";
import useProgressBar from "../hooks/useProgressBar";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [videos, setVideos] = useState([]);
  const { setLoading, setProgress } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    if (selectedCategory === "Trending") {
      fetchFromAPI("trending")
        .then((data) => setVideos(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else {
      fetchFromAPI(`search?q=${selectedCategory}&filter=all`)
        .then((data) => setVideos(data.items))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

useProgressBar();

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
      <Box p={2} sx={{ overflowY: "auto", height: "86vh", flex: 2 }}>
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

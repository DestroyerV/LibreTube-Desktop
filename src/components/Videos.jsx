/* eslint-disable react/prop-types */
import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, direction }) => {
  // console.log(videos)
  if (!videos?.length) return "Loading....";
  return (
    <Stack
      direction={direction || "row"}
      flexWrap='wrap'
      justifyContent='start'
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.type === "stream" && <VideoCard video={item} />}
          {item.type === "channel" && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;

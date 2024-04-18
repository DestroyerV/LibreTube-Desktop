/* eslint-disable react/prop-types */
import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard, LoadingScreen } from "./";

const Videos = ({ videos, direction, justifyContent }) => {
  // console.log(videos)
  if (!videos?.length) return <LoadingScreen />;
  return (
    <Stack
      flexWrap='wrap'
      justifyContent={justifyContent || "start"}
      gap={2}
      sx={{
        flexDirection: { xs: "row", md: direction },}}
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

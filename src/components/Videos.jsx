/* eslint-disable react/prop-types */
import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, direction, justifyContent, avatarUrl }) => {
  return (
    <Stack
      flexWrap='wrap'
      justifyContent={justifyContent || "start"}
      gap={2}
      sx={{
        flexDirection: { xs: "row", md: direction },
      }}
    >
      {videos?.length
        ? videos.map((item, idx) => (
            <Box key={idx}>
              {item.type === "stream" && (
                <VideoCard video={item} avatarUrl={avatarUrl} />
              )}
              {item.type === "channel" && <ChannelCard channelDetail={item} />}
            </Box>
          ))
        : Array(10)
            .fill(0)
            .map((item, idx) => (
              <Box key={idx}>
                <VideoCard video={item} />
              </Box>
            ))}
    </Stack>
  );
};

export default Videos;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard, LoadingScreen } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);

  useEffect(() => {
    fetchFromAPI(`channel/${id}`).then((data) => setChannelDetail(data));
  }, [id]);
  if (!channelDetail) {
    return <LoadingScreen />;
  }
  return (
    <Box p={2} sx={{overflowY: "auto", height: "90vh"}} >
      <Box>
        <div
          style={{
            backgroundImage: `url(${channelDetail?.bannerUrl})`,
            zIndex: 10,
            height: "300px",
            borderRadius: "12px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box p={2} display='flex'>
        <Videos
          videos={channelDetail?.relatedStreams}
          avatarUrl={channelDetail?.avatarUrl}
          justifyContent={"center"}
        />
      </Box>
    </Box>
  );
};

export default ChannelDetail;

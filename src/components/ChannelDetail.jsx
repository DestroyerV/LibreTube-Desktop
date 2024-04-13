import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);

  useEffect(() => {
    fetchFromAPI(`channel/${id}`).then((data) => setChannelDetail(data));
  }, [id]);
  if (!channelDetail) {
    return <div>Loading...</div>;
  }
  return (
    <Box minHeight='95vh'>
      <Box>
        <div
          style={{
            backgroundImage: `url(${channelDetail?.bannerUrl})`,
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box p={2} display='flex'>
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={channelDetail?.relatedStreams} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;

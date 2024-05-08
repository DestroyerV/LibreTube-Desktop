import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../services/fetchFromAPI";
import { MyContext } from "../App";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const { setLoading, setProgress } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    fetchFromAPI(`channel/${id}`)
      .then((data) => setChannelDetail(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh" }}>
      <Box>
        {!channelDetail ? (
          <Skeleton
            animation='wave'
            variant='rounded'
            width='100%'
            height={300}
            sx={{ bgcolor: "#3A3939", borderRadius: "12px" }}
          />
        ) : (
          <div
            style={{
              backgroundImage: `url(${channelDetail?.bannerUrl})`,
              zIndex: 10,
              height: "300px",
              borderRadius: "12px",
            }}
          />
        )}
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

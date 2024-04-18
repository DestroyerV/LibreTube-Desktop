import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Stack, Avatar } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos, LoadingScreen } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Player } from "./VideoPlayer/Player";
import formatNumber from "../utils/formatNumber";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`streams/${id}`)
      .then((data) => setVideoDetail(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!videoDetail) {
    return <LoadingScreen />;
  }

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              width: { sm: "100%", md: "85%" },
              marginX: "auto",
              borderRadius: "26px",
              overflow: "hidden",
            }}
          >
            <Player videoDetail={videoDetail} />
          </Box>
          <Box sx={{ width: { sm: "100%", md: "85%" }, marginX: "auto" }}>
            <Typography color='#fff' variant='h6' fontWeight='bold' py={1}>
              {videoDetail?.title}
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ color: "#fff" }}
              alignItems="center"
            >
              <Link to={`${videoDetail?.uploaderUrl}`}>
                <Stack direction='row' alignItems="center" gap="10px">
                  <Avatar src={videoDetail?.uploaderAvatar} alt='avatar' />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant='subtitle1' color='#fff'>
                        {videoDetail?.uploader}
                        <CheckCircle
                          sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                        />
                      </Typography>
                      <Typography variant='subtitle2' color='gray'>
                        {formatNumber(videoDetail?.uploaderSubscriberCount)}{" "}
                        Subscribers
                      </Typography>
                    </Box>
                </Stack>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(videoDetail?.views).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(videoDetail?.likes).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent='center'
          alignItems='center'
        >
          <Videos
            videos={videoDetail?.relatedStreams}
            direction='column'
            justifyContent='center'
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;

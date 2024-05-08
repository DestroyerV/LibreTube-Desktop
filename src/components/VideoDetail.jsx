import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Stack, Avatar, Skeleton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";
import { fetchFromAPI } from "../services/fetchFromAPI";
import { Player } from "./VideoPlayer/Player";
import formatNumber from "../utils/formatNumber";
import { MyContext } from "../App";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const { id } = useParams();
  const { setLoading, setProgress } = useContext(MyContext);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    fetchFromAPI(`streams/${id}`)
      .then((data) => setVideoDetail(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Box minHeight='95vh'>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ overflowY: "auto", height: "90vh" }}
      >
        <Box flex={1}>
          <Box
            sx={{
              width: { xs: "95%", md: "85%" },
              marginX: "auto",
              borderRadius: "26px",
              overflow: "hidden",
              // paddingX : {xs : "5px", md : "0px"},
            }}
          >
            {!videoDetail ? (
              <Skeleton
                animation='wave'
                variant='rounded'
                width='100%'
                sx={{
                  bgcolor: "#3A3939",
                  height: { xs: "200px", sm: "400px", md: "500px" },
                }}
              />
            ) : (
              <Player videoDetail={videoDetail} />
            )}
          </Box>
          <Box sx={{ width: { xs: "95%", md: "85%" }, marginX: "auto" }}>
            <Typography
              color='#fff'
              fontWeight='bold'
              py={1}
              sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" } }}
            >
              {!videoDetail ? (
                <Skeleton
                  animation='wave'
                  variant='text'
                  sx={{ bgcolor: "#3A3939" }}
                />
              ) : (
                videoDetail?.title
              )}
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ color: "#fff" }}
              alignItems='center'
            >
              {!videoDetail ? (
                <Skeleton
                  animation='wave'
                  variant='circular'
                  width={40}
                  height={40}
                  sx={{ bgcolor: "#3A3939" }}
                />
              ) : (
                <Link to={`${videoDetail?.uploaderUrl}`}>
                  <Stack direction='row' alignItems='center' gap='10px'>
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
              )}
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body2' sx={{ opacity: 0.7 }}>
                  {!videoDetail ? (
                    <Skeleton
                      animation='wave'
                      variant='text'
                      width={80}
                      sx={{ bgcolor: "#3A3939" }}
                    />
                  ) : (
                    formatNumber(videoDetail?.views) + " views"
                  )}
                </Typography>
                <Typography variant='body2' sx={{ opacity: 0.7 }}>
                  {!videoDetail ? (
                    <Skeleton
                      animation='wave'
                      variant='text'
                      width={80}
                      sx={{ bgcolor: "#3A3939" }}
                    />
                  ) : (
                    formatNumber(videoDetail?.likes) + " likes"
                  )}
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

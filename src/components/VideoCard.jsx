/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Chip,
  Skeleton,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import formatNumber from "../utils/formatNumber";
import formatTime from "../utils/formatTime";
import React from "react";
import theme from "../../theme";

const VideoCard = ({ video, avatarUrl }) => {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "370px" },
        boxShadow: "none",
        borderRadius: "1px",
        backgroundColor: theme.palette.background.main,
        position: "relative",
      }}>
      {!video ? (
        <Skeleton
          animation='wave'
          variant='rounded'
          width='100%'
          height={200}
          sx={{ bgcolor: theme.palette.background.light, borderRadius: "12px" }}
        />
      ) : (
        <Link to={`/video/${video?.url.split("=")[1]}`}>
          {" "}
          <CardMedia
            image={video?.thumbnail}
            alt={video?.title}
            sx={{
              width: { xs: "100%", sm: "358px", md: "370px" },
              height: 215,
              borderRadius: "12px",
            }}
            loading='lazy'
          />
          <Chip
            label={formatTime(video?.duration)}
            size='small'
            sx={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              position: "absolute",
              top: "50%",
              right: "10px",
              borderRadius: "6px",
              fontWeight: "500",
            }}
          />
        </Link>
      )}
      <CardContent
        sx={{
          backgroundColor: theme.palette.background.main,
          height: "106px",
          display: "flex",
          gap: "15px",
        }}>
        {!video ? (
          <Skeleton
            animation='wave'
            variant='circular'
            width={36}
            height={36}
            sx={{ bgcolor: theme.palette.background.light }}
          />
        ) : (
          <Link to={video?.uploaderUrl}>
            <Box sx={{ paddingTop: "10px" }}>
              <Avatar
                src={video?.uploaderAvatar || avatarUrl}
                alt={video?.uploader}
              />
            </Box>
          </Link>
        )}
        <Box>
          {!video ? (
            <React.Fragment>
              <Typography variant='subtitle1'>
                <Skeleton
                  animation='wave'
                  width={200}
                  sx={{ bgcolor: theme.palette.background.light }}
                />
              </Typography>
              <Typography variant='subtitle2'>
                <Skeleton
                  animation='wave'
                  sx={{ bgcolor: theme.palette.background.light }}
                />
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to={`/video/${video?.url.split("=")[1]}`}>
                <Typography
                  variant='subtitle1'
                  fontWeight='bold'
                  color='#FFF'
                  title={video?.title}>
                  {video?.title.slice(0, 60)}
                </Typography>
              </Link>
              <Link to={video?.uploaderUrl}>
                <Typography
                  variant='subtitle2'
                  fontWeight='bold'
                  color='gray'
                  sx={{ display: "flex", alignItems: "center" }}>
                  {video?.uploaderName}
                  {video?.uploaderVerified && (
                    <CheckCircle
                      sx={{ fontSize: 14, color: "gray", ml: "5px" }}
                    />
                  )}
                </Typography>
                <Typography variant='subtitle2' fontWeight='bold' color='gray'>
                  {formatNumber(video?.views)} views • {video?.uploadedDate}
                </Typography>
              </Link>
            </React.Fragment>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

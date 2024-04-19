/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import formatNumber from "../utils/formatNumber";

const VideoCard = ({ video, avatarUrl }) => {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "370px" },
        boxShadow: "none",
        borderRadius: "1px",
        backgroundColor: "#161316",
      }}
    >
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
        />
      </Link>
      <CardContent
        sx={{
          backgroundColor: "#161316",
          height: "106px",
          display: "flex",
          gap: "15px",
        }}
      >
        <Link to={video?.uploaderUrl}>
          <Box sx={{ paddingTop: "10px" }}>
            <Avatar src={video?.uploaderAvatar || avatarUrl} alt={video?.uploader} />
          </Box>
        </Link>
        <Box>
          <Link to={`/video/${video?.url}`}>
            <Typography
              variant='subtitle1'
              fontWeight='bold'
              color='#FFF'
              title={video?.title}
            >
              {video?.title.slice(0, 60)}
            </Typography>
          </Link>
          <Link to={video?.uploaderUrl}>
            <Typography
              variant='subtitle2'
              fontWeight='bold'
              color='gray'
              sx={{ display: "flex", alignItems: "center" }}
            >
              {video?.uploaderName}
              {video?.uploaderVerified && (
                <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
              )}
            </Typography>
            <Typography variant='subtitle2' fontWeight='bold' color='gray'>
              {formatNumber(video?.views)} views • {video?.uploadedDate}
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({ video }) => {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: "1px",
        backgroundColor: "#161316",
      }}
    >
      <Link to={video?.url ? `/video/${video?.url.split("=")[1]}` : demoVideoUrl}>
        {" "}
        <CardMedia
          image={video?.thumbnail || demoThumbnailUrl}
          alt={video?.title}
          sx={{
            width: { xs: "100%", sm: "358px", md: "320px" },
            height: 180,
            borderRadius: "12px",
          }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#161316", height: "106px" }}>
        <Link to={video?.url ? `/video/${video?.url}` : demoVideoUrl}>
          <Typography
            variant='subtitle1'
            fontWeight='bold'
            color='#FFF'
            title={video?.title}
          >
            {video?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={video?.uploaderUrl ? video?.uploaderUrl : demoChannelUrl}>
          <Typography
            variant='subtitle2'
            fontWeight='bold'
            color='gray'
            sx={{ display: "flex", alignItems: "center" }}
          >
            {video?.uploaderName || demoChannelTitle}
            {video?.uploaderVerified && (
              <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
            )}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

/* eslint-disable react/prop-types */
import {
  Box,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import formatNumber from "../utils/formatNumber";
import theme from "../../theme";

const ChannelCard = ({ channelDetail, marginTop }) => {
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
        marginTop: marginTop,
      }}>
      {!channelDetail ? (
        <div>
          <Skeleton
            animation='wave'
            variant='circular'
            width={180}
            height={180}
            sx={{ bgcolor: theme.palette.background.light }}
          />

          <Skeleton
            animation='wave'
            variant='text'
            sx={{ bgcolor: theme.palette.background.light }}
          />
          <Skeleton
            animation='wave'
            variant='text'
            sx={{ bgcolor: theme.palette.background.light }}
          />
        </div>
      ) : (
        <Link to={channelDetail?.url}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              color: "#fff",
            }}>
            <CardMedia
              image={channelDetail?.thumbnail || channelDetail?.avatarUrl}
              alt={channelDetail?.name}
              sx={{
                borderRadius: "50%",
                height: "180px",
                width: "180px",
                mb: 2,
                border: "1px solid #e3e3e3",
              }}
            />
            <Typography
              variant='h6'
              title={channelDetail?.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {channelDetail?.name.slice(0, 20)}
              {channelDetail?.verified && (
                <CheckCircle sx={{ fontSize: 16, color: "gray", ml: "5px" }} />
              )}
            </Typography>
            <Typography sx={{ color: "gray", fontWeight: "Bold" }}>
              {formatNumber(
                channelDetail?.subscribers || channelDetail?.subscriberCount
              )}{" "}
              Subscribers
            </Typography>
          </CardContent>
        </Link>
      )}
    </Box>
  );
};

export default ChannelCard;

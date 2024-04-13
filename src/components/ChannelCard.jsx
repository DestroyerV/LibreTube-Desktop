/* eslint-disable react/prop-types */
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
      }}
    >
      <Link to={channelDetail?.url}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
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
            sx={{ display: "flex", alignItems: "center" }}
          >
            {channelDetail?.name}
            {channelDetail?.verified && (
              <CheckCircle sx={{ fontSize: 16, color: "gray", ml: "5px" }} />
            )}
          </Typography>
          {channelDetail?.subscribers || channelDetail?.subscriberCount && (
            <Typography>
              {parseInt(channelDetail?.subscribers || channelDetail?.subscriberCount).toLocaleString()}{" "}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;

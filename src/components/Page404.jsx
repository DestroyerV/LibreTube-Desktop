import { Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import astronut from "../assets/GroupAstronut.svg";
const Page404 = () => {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        height: { xs: "85vh", md: "90vh" },
        flexDirection: { md: "row" },
        gap: "10%",
      }}>
      <Box sx={{ textAlign: "center", lineHeight: "6" }}>
        <Typography
          color='gray'
          lineHeight={1.5}
          sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: "bold" }}>
          404 Page Not Found
        </Typography>
        <Typography
          color='gray'
          sx={{ fontSize: { xs: "1rem", md: "1.5rem" }, fontWeight: "bold" }}>
          Your search has ventured beyond the known universe.
        </Typography>
        <Link to='/'>
          <Button variant='outlined' sx={{ borderRadius: "18px" }}>
            Back To Home
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          transform: { md: "translateY(-20px)" },
        }}>
        <div className='gradient'></div>
        <img className='astronut' src={astronut} alt='astronut' />
      </Box>
    </Stack>
  );
};

export default Page404;

import { Stack, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import logoText from "../assets/logoText.svg";
import icon from "../assets/icon.png";
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  return (
    <Stack
      direction='row'
      alignItems={"center"}
      p={2}
      sx={{
        position: "sticky",
        background: "#161316",
        top: 0,
        justifyContent: "space-between",
        zIndex: "10",
      }}
    >
      <Link to='/' style={{ display: "flex", alignItems: "center" }}>
        <img src={icon} alt='logo' height={45} />
        <Typography sx={{ display: { xs: "none", md: "flex" }, px: 2 }}>

        <img src={logoText} alt='logo' height={25} />
        </Typography>
      </Link>
      <SearchBar />
      <IconButton sx={{ p: "10px", color: "#ff7691"}}>
        <SettingsIcon fontSize="medium" />
      </IconButton>
    </Stack>
  );
};

export default Navbar;

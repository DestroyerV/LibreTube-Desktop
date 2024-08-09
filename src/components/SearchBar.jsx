import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../../theme";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <Paper
      component={Form}
      onSubmit={(e) => handleSubmit(e)}
      sx={{
        borderRadius: 20,
        border: `1px solid ${theme.palette.primary.main}`,
        pl: 2,
        boxShadow: "none",
        backgroundColor: theme.palette.background.main,
        display: "flex",
        alignItems: "center",
      }}>
      <input
        className='search-bar'
        placeholder='Search'
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <IconButton
        type='submit'
        sx={{ p: "10px", color: theme.palette.primary.main }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

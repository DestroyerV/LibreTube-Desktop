import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
        border: "1px solid #ff7691",
        pl: 2,
        boxShadow: "none",
        backgroundColor: "#161316",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        className='search-bar'
        placeholder='Search'
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <IconButton type='submit' sx={{ p: "10px", color: "#ff7691" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";
import theme from "../../theme";

const SideBar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Stack
      direction='row'
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
        minWidth: { md: "200px" },
      }}>
      {categories.map((category) => (
        <button
          className='category-btn'
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background:
              category.name === selectedCategory && theme.palette.primary.main,
            color: "white",
          }}
          key={category.name}>
          <span
            style={{
              color:
                category.name === selectedCategory
                  ? "white"
                  : theme.palette.primary.main,
              marginRight: "15px",
            }}>
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}>
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default SideBar;

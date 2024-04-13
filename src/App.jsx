import { Box } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ChannelDetail,
  Feed,
  Navbar,
  SearchFeed,
  VideoDetail,
} from "./components";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Feed />,
        </>
      ),
    },
    {
      path: "/video/:id",
      element: (
        <>
          <Navbar />
          <VideoDetail />,
        </>
      ),
    },
    {
      path: "/channel/:id",
      element: (
        <>
          <Navbar />
          <ChannelDetail />,
        </>
      ),
    },
    {
      path: "/search/:searchTerm",
      element: (
        <>
          <Navbar />
          <SearchFeed />,
        </>
      ),
    },
  ]);

  return (
    <>
      <Box sx={{ backgroundColor: "#161316" }}>
        <RouterProvider router={routes} />
      </Box>
    </>
  );
}

export default App;

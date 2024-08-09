import { Box, LinearProgress } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ChannelDetail,
  Feed,
  Navbar,
  SearchFeed,
  VideoDetail,
  Page404,
} from "./components";
import { createContext, useState } from "react";
import theme from "../theme";

export const MyContext = createContext({});
export function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const values = { loading, setLoading, progress, setProgress };

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
    {
      path: "*",
      element: (
        <>
          <Navbar />
          <Page404 />
        </>
      ),
    },
  ]);

  return (
    <MyContext.Provider value={values}>
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.background.main,
            height: "100vh",
            overflow: { md: "hidden" },
          }}>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: "100",
              width: "100%",
            }}>
            {loading && (
              <LinearProgress variant='determinate' value={progress} />
            )}
          </Box>
          <RouterProvider router={routes} />
        </Box>
      </>
    </MyContext.Provider>
  );
}

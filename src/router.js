import { createBrowserRouter } from "react-router-dom";
import App from "views/App";
import Index from "views/Index";
import EditProfile from "views/examples/EditProfile";
import LandingPage from "views/examples/LandingPage";
import ProfilePage from "views/examples/ProfilePage";
import RegisterPage from "views/examples/RegisterPage";
import Search from "views/examples/Search";
import MovieOverview from "views/page/Movie/MovieOver";
import RecomOverView from "views/page/Movie/RecommOverview";

import Person from "views/page/Person";
import TvOverView from "views/page/Tv/TvOver";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {
  //     path : '*',
  //     element: <App to/>

  // },
  {
    path: "register-page",
    element: <RegisterPage />,
  },
  {
    path: "/home-page",
    element: <Index />,
  },
  {
    path: "/landing-page",
    element: <LandingPage />,
  },
  {
    path: "/profile-page",
    element: <ProfilePage />,
    children: [{ path: "edit-profile", element: <EditProfile /> }],
  },
  {
    path: "/view-page/:id/:name",
    element: <TvOverView />,
  },
  {
    path: "/Movie/:id/:name",
    element: <MovieOverview />,
  },
  {
    path: "/recommendation/:id/:name",
    element: <RecomOverView />,
  },
  {
    path: "search-page",
    element: <Search />,
  },
  { path: "/edit-profile", element: <EditProfile /> },
  { path: "/person", element: <Person /> }
]);

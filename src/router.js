import { createBrowserRouter } from "react-router-dom";
import App from "views/App";
import Index from "views/Index";
import LandingPage from "views/examples/LandingPage";
import ProfilePage from "views/examples/ProfilePage";
import RegisterPage from "views/examples/RegisterPage";
import Search from "views/examples/Search";
import MovieOverview from "views/page/Movie/MovieOver";
import OverView from "views/page/OverView";


export  const router =  createBrowserRouter([
    {
        path : '/',
        element: <App/>
    },
    // {
    //     path : '*',
    //     element: <App to/>
        
    // },
    {
        path: 'register-page',
        element: <RegisterPage/>
    },
    {
        path: '/home-page',
        element: <Index/>
    },
    {
        path: '/landing-page',
        element: <LandingPage/>
    },
    {
        path: '/profile-page',
        element: <ProfilePage/>
    },
    {
        path: "/view-page/:id/:name",
        element: <OverView/>
    },
    {
        path: '/Movie/:id/:name',
        element: <MovieOverview/>
    },
    {
        path: 'search-page',
        element: <Search />
    },
    
])
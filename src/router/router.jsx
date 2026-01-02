import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layoute/RootLayout";
import Home from "../pages/home/Home";
import PetListing from "@/pages/petListing/PetListing";
import PetDetails from "@/pages/petDetails/PetDetails";
import DonationCampaigns from "@/pages/donetion/DonetionCampaigns";
import DonationDetails from "@/pages/donetionDetail/DonationDetails";
import AuthenticationLayout from "@/layoute/AuthenticationLayout";
import Register from "@/pages/authentication/register/Register";
import Login from "@/pages/authentication/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children: [
        {
            path:"/",
            element:<Home/>
        },
        {
          path: "/pet-listing",
          element: <PetListing/>
        },
        {
          path: "/pet-details/:id",
          element: <PetDetails/>,
          loader: ({params}) => fetch(`pets.json/${params.id}`)
        },
        {
          path: '/donation',
          element: <DonationCampaigns/>
        },
        {
          path: '/donation-details/:id',
          element: <DonationDetails/>,
          loader: ({params}) => fetch(`donations.json/${params.id}`)
        }
    ]
  },
  {
    path: '/',
    element: <AuthenticationLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      }
    ]
  }
]);

export default router;
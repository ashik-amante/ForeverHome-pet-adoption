import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layoute/RootLayout";
import Home from "../pages/home/Home";
import PetListing from "@/pages/petListing/PetListing";
import PetDetails from "@/pages/petDetails/PetDetails";
import DonationCampaigns from "@/pages/donetion/DonetionCampaigns";

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
        }
    ]
  },
]);

export default router;
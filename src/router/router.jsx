import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layoute/RootLayout";
import Home from "../pages/home/Home";
import PetListing from "@/pages/petListing/PetListing";

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
        }
    ]
  },
]);

export default router;
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
import DashboardLayout from "@/layoute/DashBoardLayouts";
import AddAPet from "@/pages/Dashboard/AddAPet";
import MyAdded from "@/pages/Dashboard/MyAdded";
import AdoptionRequest from "@/pages/Dashboard/AdoptionRequest";
import CreateDonation from "@/pages/Dashboard/CreateDonation";
import MyCampaign from "@/pages/Dashboard/MyCampaign";
import MyDonation from "@/pages/Dashboard/MyDonation";
import UpdatePet from "@/pages/Dashboard/UpdatePet";
import axios from "axios";
import EditDonation from "@/pages/Dashboard/EditDonation";
import Forbidden from "@/components/Forbidden";
import ErrorPage from "@/components/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AllPets from "@/pages/Dashboard/AllPets";
import AllDonations from "@/pages/Dashboard/AllDonations";
import AdminRoute from "./AdminRoute";
import AdminStat from "@/pages/Dashboard/AdminStat";



const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    errorElement: <ErrorPage/>,
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
          loader: async ({params}) => {
            const res = await axios.get(`http://localhost:5000/petDetails/${params.id}`)
            return res.data
          }
        },
        {
          path: '/donation',
          element: <DonationCampaigns/>
        },
        {
          path: '/donationDetails/:id',
          element: <DonationDetails/>,
          loader: async ({params}) => {
            const res = await axios.get(`http://localhost:5000/donationCampaignsDetails/${params.id}`)
            return res.data
          }
        },
        {
          path: '/forbidden',
          element: <Forbidden/>
        }
    ]
  },
  // authentication routes
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
  },

  // dashboard routes
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
      {
        path: 'add-pet',
        element: <AddAPet/>
      },
      {
        path: 'my-pets',
        element: <MyAdded/>
      },
   
      {
        path: 'adoption-requests',
        element: <AdoptionRequest/>
      },
      {
        path: 'create-donation',
        element: <CreateDonation/>
      },
      {
        path: 'my-campaigns',
        element: <MyCampaign/>
      },
      {
        path: 'my-donations',
        element: <MyDonation/>
      },
      {
        path: 'update-pet/:id',
        element: <UpdatePet/>,
        loader: async ({params})=>{
          const res = await axios.get(`http://localhost:5000/petDetails/${params.id}`)
          return res.data
        }
      },
      {
        path: 'edit-donation/:id',
        element: <EditDonation/>,
        loader: async ({params})=>{
          const res = await axios.get(`http://localhost:5000/donationCampaignsDetails/${params.id}`)
          return res.data
        }
      },
      // Admin routes
      {
        path: 'all-pets',
        element: <AdminRoute><AllPets/></AdminRoute>
      },
      {
        path: 'all-donations',
        element: <AdminRoute><AllDonations/></AdminRoute>
      },
      {
        path: 'statistics',
        element: <AdminRoute><AdminStat/></AdminRoute>
      },
    ]
  }
]);

export default router;
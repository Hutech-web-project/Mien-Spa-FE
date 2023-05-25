import AdminIndex from "../pages/Admin/admin_index";
import BookingIndex from "../pages/User/BookingPage/booking_index";
import HomeIndex from "../pages/User/HomePage/home_index";
import ShopIndex from "../pages/User/ShopPage/shop_index";
import UserIndex from "../pages/User/UserPage/user_index";
 const routes = [
  {
    path: "/",
    element: <HomeIndex />,
  },
  {
    path: "/shop",
    element: <ShopIndex />,
  },
  {
    path: "/booking",
    element: <BookingIndex />,
  },
  {
    path: "/user",
    element: <UserIndex />,
  },
  {
    path:"/system_mienspa",
    element: <AdminIndex />,
  }
];

export default routes;

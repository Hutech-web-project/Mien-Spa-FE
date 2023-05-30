import AdminIndex from "../pages/Admin/admin_index";
import BookingIndex from "../pages/User/BookingPage/booking_index";
import HomeIndex from "../pages/User/HomePage/home_index";
import ShopIndex from "../pages/User/ShopPage/shop_index";
import UserIndex from "../pages/User/UserPage/user_index";
 const routes = [
  {
    path: "/",
    element: <HomeIndex />,
    allowed: 1
  },
  {
    path: "/shop",
    element: <ShopIndex />,
    allowed: 1
  },
  {
    path: "/booking",
    element: <BookingIndex />,
    allowed: 1
  },
  {
    path: "/user",
    element: <UserIndex />,
    allowed: 2
  },
  {
    path:"/system_mienspa",
    element: <AdminIndex />,
    allowed: 3
  }
];

export default routes;

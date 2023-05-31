import AdminIndex from "../pages/Admin/admin_index";
import BookingIndex from "../pages/User/BookingPage/booking_index";
import HomeIndex from "../pages/User/HomePage/home_index";
import ShopIndex from "../pages/User/ShopPage/shop_index";
import UserIndex from "../pages/User/UserPage/user_index";
import CartIndex from "../pages/User/CartPage/cart_index";
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
  },
  {
    path:"/cart",
    element: <CartIndex />,
    allowed: 1
  }
];

export default routes;

import BookingIndex from "../pages/User/BookingPage/booking_index";
import CartIndex from "../pages/User/CartPage/cart_index";
import HomeIndex from "../pages/User/HomePage/home_index";
import ShopIndex from "../pages/User/ShopPage/shop_index";
import EditProfile from "../pages/User/UserPage/component/edit_profile";
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
    path: "/shopping-cart",
    element: <CartIndex />,
  },
  {
    path: "/users",
    element: <UserIndex />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
];

export default routes;

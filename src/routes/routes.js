import BookingIndex from "../pages/User/BookingPage/booking_index";
import HomeIndex from "../pages/User/HomePage/home_index";
import ShopIndex from "../pages/User/ShopPage/shop_index";
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
];

export default routes;

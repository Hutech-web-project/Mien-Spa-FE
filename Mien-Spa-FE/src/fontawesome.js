//Khởi tạo thư viện icon của riêng bạn
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

//Import các icon mà bạn muốn sử dụng trong từng gói
import {
  faAngleDoubleRight,
  faArrowLeft,
  faCalendarAlt,
  faCartShopping,
  faCircle,
  faCode,
  faEnvelope,
  faEye,
  faHeart,
  faHighlighter,
  faMapMarkerAlt,
  faPhone,
  faSearch,
  faTimes,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

//Add các icon đã được import vào trong thư viện của bạn
library.add(
  faCode,
  faHighlighter,
  faGoogle,
  faUser,
  faCartShopping,
  faAngleDoubleRight,
  faFacebook,
  faTwitter,
  faEnvelope,
  faInstagram,
  faCircle,
  faSearch,
  faPhone,
  faMapMarkerAlt,
  faCalendarAlt,
  faEye,
  faHeart,
  faTimes,
  faArrowLeft,
  faUsers
);

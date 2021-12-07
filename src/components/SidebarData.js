import {
  GiTempleDoor,
  GiReceiveMoney,
  GiFlatHammer,
  GiTatteredBanner,
} from "react-icons/gi";
import { MdDashboard, MdCardGiftcard } from "react-icons/md";
import { BiShapeTriangle, BiReceipt } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

export const SidebarData = [
  {
    title: "Lịch tiệc cưới",
    path: "/",
    icon: <MdDashboard />,
    cName: "nav-text",
  },
  {
    title: "Tiệc cưới",
    path: "/wedding",
    icon: <MdCardGiftcard />,
    cName: "nav-text",
    access: "READ_FEAST",
  },
  {
    title: "Sảnh",
    path: "/lobby",
    icon: <GiTempleDoor />,
    cName: "nav-text",
    access: "READ_LOBBY",
  },
  {
    title: "Món ăn",
    path: "/Food",
    icon: <IoFastFoodOutline />,
    cName: "nav-text",
    access: "READ_FOOD",
  },
  {
    title: "Dịch vụ",
    path: "/Service",
    icon: <BiShapeTriangle />,
    cName: "nav-text",
    access: "READ_SERVICE",
  },
  {
    title: "Khuyến mãi",
    path: "/Promotion",
    icon: <GiTatteredBanner />,
    cName: "nav-text",
    access: "READ_SERVICE",
  },
  {
    title: "Hóa đơn",
    path: "/bill",
    icon: <BiReceipt />,
    cName: "nav-text",
    access: "READ_BILL",
  },
  {
    title: "Doanh thu",
    path: "/Revenue",
    icon: <GiReceiveMoney />,
    cName: "nav-text",
    access: "READ_REPORT",
  },
  {
    title: "Phân quyền",
    path: "/access",
    icon: <VerifiedUserIcon />,
    cName: "nav-text",
  },
  {
    title: "Quy định",
    path: "/Policy",
    icon: <GiFlatHammer />,
    cName: "nav-text",
  },
];

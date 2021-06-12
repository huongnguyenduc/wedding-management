import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";

export const SidebarData = [
    {
        title: 'Bảng điều khiển',
        path: '/',
        icon: <MdIcons.MdDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Tiệc cưới',
        path: '/wedding',
        icon: <MdIcons.MdCardGiftcard />,
        cName: 'nav-text'
    },
    {
        title: 'Sảnh',
        path: '/lobby',
        icon: <GiIcons.GiTempleDoor />,
        cName: 'nav-text'
    },
    {
        title: 'Hóa đơn',
        path: '/',
        icon: <BiIcons.BiReceipt />,
        cName: 'nav-text'
    },
    {
        title: 'Doanh thu',
        path: '/',
        icon: <GiIcons.GiReceiveMoney />,
        cName: 'nav-text'
    },
    {
        title: 'Món ăn',
        path: '/Food',
        icon: <IoIcons.IoFastFoodOutline />,
        cName: 'nav-text'
    },
    {
        title: 'Dịch vụ',
        path: '/Service',
        icon: <BiIcons.BiShapeTriangle />,
        cName: 'nav-text'
    },
    {
        title: 'Quy định',
        path: '/Policy',
        icon: <GiIcons.GiFlatHammer />,
        cName: 'nav-text'
    },

];

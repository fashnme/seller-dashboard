import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Inventory from "views/Inventory";
import Orders from "views/Orders";
import AddProduct from "views/AddProduct";
import EditProduct from "views/EditProduct";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "pe-7s-note2",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/inventory",
    name: "Inventory",
    icon: "pe-7s-cart",
    component: Inventory,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/inventory/add",
    name: "Add Product",
    invisible: true,
    component: AddProduct,
    layout: "/admin"
  },
  {
    path: "/inventory/edit/:id",
    name: "Edit Product",
    invisible: true,
    component: EditProduct,
    layout: "/admin"
  }
];

export default dashboardRoutes;

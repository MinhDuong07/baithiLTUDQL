import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute.tsx";


import CategoryPage from "./pages/CategoryPage.tsx";
import SupplierPage from "./pages/SupplierPage.tsx";
import StockEntryPage from "./pages/StockEntryPage.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import CustomerPage from "./pages/CustomerPage.tsx";

import AdminOrderPage from "./pages/AdminOrderPage.tsx";

import StatisticsPage from "./pages/StatisticsPage.tsx";
import { readRoles } from "./utils/localstorage.ts";
import ProductAdminPage from "./pages/ProductAdminPage.tsx";
import ProductUserPage from "./pages/ProductUserPage.tsx";
import Home from "./pages/Home.tsx";
import BuddhistFuneral from "./pages/BuddhistFuneral.tsx";
import CatholicFuneral from "./pages/CatholicFuneral.tsx";
import CoffinProduction from "./pages/CoffinProduction.tsx";




const role = readRoles() || "ROLE_USER";
const basePagePath = role === "ROLE_ADMIN" ? "/page/admin" : "/page";

// Các route dành riêng cho ADMIN
const adminRoutes = [
  {
    path: `${basePagePath}/homeadmin`,
    element: <StatisticsPage/>,
  },
  {
    path: `${basePagePath}/product`,
    element: <ProductAdminPage />,
  },
  {
    path: `${basePagePath}/order`,
    element: <AdminOrderPage />,
  },
  {
    path: `${basePagePath}/statistics`,
    element: <StatisticsPage />,
  },
  {
    path: `${basePagePath}/customer`,
    element: <CustomerPage />,
  },
  {
    path: `${basePagePath}/category`,
    element: <CategoryPage />,
  },
  {
    path: `${basePagePath}/supplier`,
    element: <SupplierPage />,
  },
  {
    path: `${basePagePath}/stockentry`,
    element: <StockEntryPage />,
  },
];

// Các route dành cho USER (hoặc cả USER & ADMIN)
const userRoutes = [
  {
    path: `${basePagePath}/home`,
    element: <Home />,
  },
  {
    path: `${basePagePath}/about`,
    element: <h1> Đặt Giới thiệu ở đây</h1>,
  },
  {
    path: `${basePagePath}/product`,
    element: <ProductUserPage />,
  },

  {
    path: `${basePagePath}/buddhist-funeral`,
    element: <BuddhistFuneral />,
  },
  
  {
    path: `${basePagePath}/catholic-funeral`,
    element: <CatholicFuneral />,
  },
  
  {
    path: `${basePagePath}/coffin-production`,
    element: <CoffinProduction />,
  },
  
];

// Chỉ thêm adminRoutes nếu role là ADMIN
const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: basePagePath,
    element: <PrivateRoute />,
    children: role === "ROLE_ADMIN" ? [...adminRoutes, ...userRoutes] : userRoutes,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

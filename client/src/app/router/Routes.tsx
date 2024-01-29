import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import Catalog from "../../features/catalog/catalog";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWraper";
import Inventory from "../../features/admin/Inventory";
import Wishlist from "../../features/wishlist/Wishlist";
import RegisterSuccess from "../../features/account/RegisterSuccess";
import ConfirmEmail from "../../features/account/ConfirmEmail";
import EmailSubmit from "../../features/account/EmailSubmit";
import ResetPassword from "../../features/account/ResetPassword";
import SettingsPage from "../../features/account/SettingsPage";
import Ambassadors from "../../features/admin/Ambassadors";
import BrandRegister from "../../features/admin/BrandRegister";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            //authenticated routes
            {element: <RequireAuth />, children: [
                {path: 'checkout', element: <CheckoutWrapper />},
                {path: 'orders', element: <Orders />},
                {path: 'wishlist', element: <Wishlist />},
            ]},
            //admin routes
            {element: <RequireAuth roles={['Admin', "Brand"]}/>, children: [
                {path: 'inventory', element: <Inventory />},
                {path: 'brandRegister', element: <BrandRegister />},
                {path: 'brands', element: <Ambassadors />},
            ]},
            
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: 'registerSuccess', element: <RegisterSuccess />},
            {path: 'verifyEmail', element: <ConfirmEmail />},
            {path: 'forgotPassword', element: <EmailSubmit />},
            {path: 'resetPassword', element: <ResetPassword />},
            {path: 'settings', element: <SettingsPage />},
            {path: '*', element: <Navigate replace to='/not-found'/> }
        ]
    }

])
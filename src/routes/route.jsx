import { createBrowserRouter, } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/LogIn";
import LoginForm from "../pages/LogIn";
import Register from "../pages/Register";
import RegistrationForm from "../pages/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },

]);

export default router;

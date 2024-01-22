import { createBrowserRouter, } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/LogIn";
import LoginForm from "../pages/LogIn";
import Register from "../pages/Register";
import RegistrationForm from "../pages/Register";
import UsersPage from "../components/User";


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
  {
    path: "/users",
    element: <UsersPage/>,
  },

]);

export default router;

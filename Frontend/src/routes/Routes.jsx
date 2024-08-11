import { createBrowserRouter } from "react-router-dom";

import Home from "../Common/Home";
import Login from "../Common/Login";
import WelcomeTest from "../Common/WelcomeTest";
import CreateAccount from "../Common/CreateAccount";
import App from "../App";
import Editor from "../Views/Admin/Editor";
import AdminProfile from "../Views/Admin/AdminProfile";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is the layout component
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <CreateAccount />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "welcome",
        element: (
            <ProtectedRoute>
                <WelcomeTest />
            </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
            <ProtectedRoute>
                <AdminProfile />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "editor",
                element: <Editor />
            }
        ]
      },

    ],
  },
]);

export default router;

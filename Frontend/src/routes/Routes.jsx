import { createBrowserRouter } from "react-router-dom";

import Home from "../Common/Home";
import Login from "../Common/Login";
import WelcomeTest from "../Common/WelcomeTest";
import CreateAccount from "../Common/CreateAccount";
import App from "../App";
import PostEditor from "../Views/Admin/PostEditor";
import AdminProfile from "../Views/Admin/AdminProfile";
import ProtectedRoute from "./ProtectedRoute";
import AdminView from "../Views/AdminView";
import UserView from "../Views/UserView";
import UserProfile from "../Views/User/UserProfile";

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
                <AdminView />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "editor",
                element: <PostEditor />
            },
            {
                path: "profile",
                element: <AdminProfile />
            }
        ]
      },
      {
        path: "user",
        element: (
            <ProtectedRoute>
                <UserView />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "profile",
                element: <UserProfile />
            }
        ]
      }

    ],
  },
]);

export default router;

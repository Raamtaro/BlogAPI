import { createBrowserRouter } from "react-router-dom";

//Elements
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }
])

export default router;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashbord from "./components/layouts/Dashboard/dashboard";
import Dashboard from "/src/pages/Dashboard/dashboard";
import Orders from "/src/pages/Orders/orders";
import Products from "./pages/dashboard/dashboard";
import Other from "/src/pages/Other/other";
import Login from "./pages/login/Login";
import Add from "./pages/add/Add";
import Edit from "./pages/edit/Edit";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashbord />,
      children: [
        {
          path: "/",
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/other",
          element: <Other />,
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/edit/:id",
          element: <Edit />
        }

      ],
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;

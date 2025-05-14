import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashbord from "./components/layouts/Dashboard/dashboard";
import Products from "./pages/dashboard/dashboard";
import Login from "./pages/login/Login";
import Add from "./pages/add/Add";
import Edit from "./pages/edit/Edit";
import Dashboard from "./pages/dashboard/dashboard";
import Orders from './pages/orders/orders'
import Other from './pages/other/other'
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

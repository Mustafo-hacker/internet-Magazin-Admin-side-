import { extendTheme } from "@mui/material";
import { AppProvider, DashboardLayout, PageContainer } from "@toolpad/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthCheck from "./auth_check/auth_check";

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "", title: "Dasboard", icon: <DashboardIcon /> },
  { segment: "orders", title: "Orders", icon: <ShoppingCartIcon /> },
  { segment: "products", title: "Products", icon: <LayersIcon /> },
  { segment: "other", title: "Category", icon: <BarChartIcon /> },
  { segment: "login", title: "Log out", icon: <LogoutIcon /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };
}

const Dashbord = () => {
  const router = useDemoRouter("/dashboard");

  const demoWindow = typeof window !== "undefined" ? window : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        title: 'Fast Cart',
        homeUrl: '/',
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <AuthCheck>
            <Outlet />
          </AuthCheck>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashbord;

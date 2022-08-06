import { BrowserRouter } from "react-router-dom";
import "./shared/forms/TranslationsYup"
import { AppRoutes } from "./routes";
import { Login, MenuSide } from "./shared/components";
import { AppThemeProvider, AuthProvider, DrawerProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AuthProvider>
    <AppThemeProvider>
      
      <Login>

      <DrawerProvider>
        <BrowserRouter>

          <MenuSide>
            <AppRoutes />
          </MenuSide>

        </BrowserRouter>
      </DrawerProvider>

      </Login>

    </AppThemeProvider>
    </AuthProvider>
  );
};

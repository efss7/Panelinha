import { BrowserRouter } from "react-router-dom";
import "./shared/forms/TranslationsYup"
import { AppRoutes } from "./routes";
import {  MenuSide } from "./shared/components";
import { AppThemeProvider,  DrawerProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppThemeProvider>
      


      <DrawerProvider>
        <BrowserRouter>

          <MenuSide>
            <AppRoutes />
          </MenuSide>

        </BrowserRouter>
      </DrawerProvider>



    </AppThemeProvider>
  );
};

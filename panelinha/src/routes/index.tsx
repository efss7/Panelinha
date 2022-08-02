import { Navigate, Route, Routes } from "react-router-dom";
import {Button} from "@mui/material"
import { useAppDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
    const {toggleDrawerOpen} = useAppDrawerContext()
    return(
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant='contained' color="primary"  onClick={toggleDrawerOpen}>Toggle Drawer</Button>}/>
            

            <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
        </Routes>
    );
};
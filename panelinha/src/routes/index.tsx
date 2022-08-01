import { Navigate, Route, Routes } from "react-router-dom";
import {Button} from "@mui/material"
export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant='contained' color="primary">Página inicial</Button>}/>
            

            <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
        </Routes>
    );
};
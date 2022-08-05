import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, DetailOfPeoples, ListOfPeople } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions: setDrawerOptions } = useDrawerContext();
  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/pagina-inicial",
        label: "Página inicial",
      },
      {
        icon: "people",
        path: "/pessoas",
        label: "Pessoas",
      },
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      
      <Route path="/pessoas" element={<ListOfPeople />} />
      <Route path="/pessoas/detalhe/:id" element={<DetailOfPeoples/>}/>

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};

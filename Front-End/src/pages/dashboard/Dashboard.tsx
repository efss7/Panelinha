import { LayoutBasePage } from "../../shared/layouts";
import { DetailTools, ListingTools } from "../../shared/components";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CitiesService } from "../../shared/services/api/cities/CitiesServices";
import { PeopleService } from "../../shared/services/api/people/PeopleServices";
export const Dashboard = () => {
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [totalCountCities, setToTalCountCities] = useState(0);

  const [isLoadingPeople, setIsLoadingPeople] = useState(false);
  const [totalCountPeople, setTotalCountPeople] = useState(0);

  useEffect(()=>{
    setIsLoadingCities(true);
    setIsLoadingPeople(true);

    CitiesService.getAll(1)
    .then((result)=>{
      setIsLoadingCities(false)
      if(result instanceof Error){
        alert(result.message)
      }else{
        setToTalCountCities(result.totalCount)
      } 
    })

    PeopleService.getAll(1)
    .then((result)=>{
      setIsLoadingPeople(false)
      if(result instanceof Error){
        alert(result.message)
      }else{
        setTotalCountPeople(result.totalCount)
      } 
    })
  },[])

  return (
    <LayoutBasePage
      tittle="Página inicial"
      listingTools={<ListingTools musterNewButton={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>
                  <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                    {!isLoadingPeople &&(
                    <Typography variant="h1">
                      {totalCountPeople}
                    </Typography>
                    )}
                    {isLoadingPeople && (
                      <Typography variant="h6">
                      Carregando...
                    </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>
                  <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                  {!isLoadingCities &&(
                    <Typography variant="h1">
                      {totalCountCities}
                    </Typography>
                    )}
                    {isLoadingCities && (
                      <Typography variant="h6">
                      Carregando...
                    </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};

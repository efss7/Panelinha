import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailTools } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/people/PeopleServices";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetailOfPeoples: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      PeopleService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setName(result.nomeCompleto);
          formRef.current?.setData(result);
        }
      });
    }else{
      formRef.current?.setData({
        email:"",
        cidadeId:"",
        nomeCompleto:""
      })
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);

    if (id === 'nova') {
      PeopleService
        .create(dados)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    } else {
      PeopleService
        .updateById(Number(id), { id: Number(id), ...dados })
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          }
        });
    }
  };
  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PeopleService.deleteById(id).then((result) => {
        alert("Registro apagado com sucesso!");
        navigate("/pessoas");
      });
    }
  };

  return (
    <LayoutBasePage
      tittle={id === "nova" ? "Nova pessoa" : name}
      listingTools={
        <DetailTools
          textNewButton="Nova"
          showSaveAndCloseButton
          showNewButton={id !== "nova"}
          showDeleteButton={id !== "nova"}
          whenClickingOnBack={() => navigate("/pessoas")}
          whenClickingOnDelete={() => handleDelete(Number(id))}
          whenClickingOnNew={() => navigate("/pessoas/detalhe/nova")}
          whenClickingOnSave={() => formRef.current?.submitForm()}
          whenClickingOnSaveAndClose={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='nomeCompleto'
                  disabled={isLoading}
                  label='Nome completo'
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='email'
                  label='Email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Cidade'
                  name='cidadeId'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </Form>
    </LayoutBasePage>
  );
};

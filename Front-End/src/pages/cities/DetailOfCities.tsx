import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailTools } from "../../shared/components";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { CitiesService } from "../../shared/services/api/cities/CitiesServices";
import * as yup from "yup"

interface IFormData {
  nome:string
}
const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3)
})

export const DetailOfCities: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const {formRef, save, saveAndClose, isSaveAndClose} = useVForm();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      CitiesService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          setName(result.nome);
          formRef.current?.setData(result);
        }
      });
    }else{
      formRef.current?.setData({
        nome:""
      })
    }
  }, [id]);

  const handleSave = (dices: IFormData) => {
    formValidationSchema.validate(dices, {abortEarly: false})
    .then((dicesValidated)=>{
      setIsLoading(true);
    
      if(dices.nome.length < 3){
        formRef.current?.setFieldError("nome", "O campo precisa ser preenchido")
        setIsLoading(false)
        return
      }
  
      if (id === 'nova') {
        CitiesService
          .create(dicesValidated)
          .then((result) => {
            setIsLoading(false);
  
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/cidades")
              } else {
                 navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
      } else {
        CitiesService
          .updateById(Number(id), { id: Number(id), ...dicesValidated })
          .then((result) => {
            setIsLoading(false);
              if (isSaveAndClose()) {
                navigate("/cidades")
              }
            
          });
      }

    })
    .catch((errors:yup.ValidationError)=>{
      const validationErrors: IVFormErrors ={}
      errors.inner.forEach(error=>{
        if(!error.path) return
        validationErrors[error.path] = error.message
      })
        formRef.current?.setErrors(validationErrors);
    })
  };
  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      CitiesService.deleteById(id).then((result) => {
        alert("Registro apagado com sucesso!");
        navigate("/cidades");
      });
    }
  };

  return (
    <LayoutBasePage
      tittle={id === "nova" ? "Nova cidade" : name}
      listingTools={
        <DetailTools
          textNewButton="Nova"
          showSaveAndCloseButton
          showNewButton={id !== "nova"}
          showDeleteButton={id !== "nova"}

          whenClickingOnSave={save}
          whenClickingOnSaveAndClose={saveAndClose}
          whenClickingOnBack={() => navigate("/cidades")}
          whenClickingOnDelete={() => handleDelete(Number(id))}
          whenClickingOnNew={() => navigate("/cidades/detalhe/nova")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
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
                  name='nome'
                  disabled={isLoading}
                  label='Nome'
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

        </Box>
      </VForm>
    </LayoutBasePage>
  );
};

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
import { PeopleService } from "../../shared/services/api/people/PeopleServices";
import * as yup from "yup"
import { AutoCompleteCities } from "./components/AutoCompleteCities";


interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  cidadeId: yup.number().required(),
  email: yup.string().required().email(),
  nomeCompleto: yup.string().required().min(3)
})

export const DetailOfPeoples: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const {formRef, save, saveAndClose, isSaveAndClose} = useVForm();
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
        cidadeId:undefined,
        nomeCompleto:""
      })
    }
  }, [id]);

  const handleSave = (dices: IFormData) => {
    formValidationSchema.validate(dices, {abortEarly: false})
    .then((dicesValidated)=>{
      setIsLoading(true);
    
      if(dices.nomeCompleto.length < 3){
        formRef.current?.setFieldError("nomeCompleto", "O campo precisa ser preenchido")
        setIsLoading(false)
        return
      }
  
      if (id === 'nova') {
        PeopleService
          .create(dicesValidated)
          .then((result) => {
            setIsLoading(false);
  
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/pessoas")
              } else {
                 navigate(`/pessoas/detalhe/${result}`);
              }
            }
          });
      } else {
        PeopleService
          .updateById(Number(id), { id: Number(id), ...dicesValidated })
          .then((result) => {
            setIsLoading(false);
     
              if (isSaveAndClose()) {
                navigate("/pessoas")
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
        console.log(validationErrors                                   )
        formRef.current?.setErrors(validationErrors);
    })
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

          whenClickingOnSave={save}
          whenClickingOnSaveAndClose={saveAndClose}
          whenClickingOnBack={() => navigate("/pessoas")}
          whenClickingOnDelete={() => handleDelete(Number(id))}
          whenClickingOnNew={() => navigate("/pessoas/detalhe/nova")}
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
                <AutoCompleteCities isExternalLoading={isLoading}/>
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </LayoutBasePage>
  );
};

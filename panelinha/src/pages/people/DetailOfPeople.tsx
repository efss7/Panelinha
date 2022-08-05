import { LinearProgress, TextField } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailTools } from "../../shared/components";
import { VTextfield } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/people/PeopleServices";

interface IFormData{
  email:string;
  cidadeId:number;
  nomeCompleto:string;
}

export const DetailOfPeoples: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null)
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
          console.log(result);
          formRef.current?.setData(result)
        }
      });
    }
  });

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
          whenClickingOnSave={() =>formRef.current?.submitForm()}
          whenClickingOnSaveAndClose={() =>formRef.current?.submitForm()}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextfield placeholder="Nome Completo" name="nomeCompleto"/>
        <VTextfield placeholder="E-mail" name="email"/>
        <VTextfield placeholder="Cidade ID" name="cidadeId"/>
      </Form>
      {/* {isLoading && <LinearProgress variant="indeterminate" />}
      <p>DetalheDasPessoas{id}</p> */}
    </LayoutBasePage>
  );
};

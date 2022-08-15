import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";

import { useEffect, useMemo, useState } from "react";
import { useDeBounce } from "../../../shared/hooks";
import { CitiesService } from "../../../shared/services/api/cities/CitiesServices";

type TAutoCompleteCitiesOption = {
  id: number;
  label: string;
};
interface IAutoCompleteCitiesProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCities: React.FC<IAutoCompleteCitiesProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("cidadeId");
  const { debounce } = useDeBounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  const [options, setOptions] = useState<TAutoCompleteCitiesOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          //   alert(result.message);
        } else {
          console.log(result);
          setOptions(
            result.data.map((city) => ({ id: city.id, label: city.nome }))
          );
        }
      });
    });
  }, [search]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find((option) => option.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disablePortal
      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setSearch("");
        clearError();
      }}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};

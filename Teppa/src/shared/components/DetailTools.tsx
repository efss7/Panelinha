import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IDetailToolsProps {
  textNewButton?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndCloseButton?: boolean;

  showNewButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndCloseButtonLoading?: boolean;

  whenClickingOnNew?: () => void;
  whenClickingOnBack?: () => void;
  whenClickingOnDelete?: () => void;
  whenClickingOnSave?: () => void;
  whenClickingOnSaveAndClose?: () => void;
}

export const DetailTools: React.FC<IDetailToolsProps> = ({
  textNewButton = "Novo",

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndCloseButton = false,

  showNewButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndCloseButtonLoading = false,

  whenClickingOnNew,
  whenClickingOnBack,
  whenClickingOnDelete,
  whenClickingOnSave,
  whenClickingOnSaveAndClose,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();
  
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {showSaveButton && !showSaveButtonLoading && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={whenClickingOnSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && <Skeleton width={110} height={60} />}

      {(showSaveAndCloseButton && !showSaveAndCloseButtonLoading && !smDown && !mdDown) && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={whenClickingOnSaveAndClose}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar e fechar
          </Typography>
        </Button>
      )}
      {(showSaveAndCloseButtonLoading && !showDeleteButtonLoading &&  !smDown && !mdDown ) && (
        <Skeleton width={180} height={60} />
      )}
      {showDeleteButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={whenClickingOnDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {showDeleteButtonLoading && <Skeleton width={110} height={60} />}
      {(showNewButton && !showNewButtonLoading && !smDown) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={whenClickingOnNew}
          endIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textNewButton}
          </Typography>
        </Button>
      )}
      {(showNewButtonLoading && !smDown ) &&(
      <Skeleton width={110} height={60} />
      )}
      {
        (showBackButton &&
            (showNewButton||showDeleteButton||showSaveButton||showSaveAndCloseButton)
            )&&(
        <Divider variant="middle" orientation="vertical" />
        )
      }
      {showBackButton && !showBackButtonLoading && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={whenClickingOnBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {showBackButtonLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};

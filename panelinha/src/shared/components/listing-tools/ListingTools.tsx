import { Button, Paper, TextField, useTheme, Box, Icon } from "@mui/material";
import React from "react";
import { Environment } from "../../environment";


interface IListingToolsProps {
  searchText?: string;
  showInputSearch?: boolean;
  whenChangingSearchText?: (newText: string) => void;
  textNewButton?: string;
  musterNewButton?: boolean;
  whenClickingOnNew?: () => void;
}
export const ListingTools: React.FC<IListingToolsProps> = ({
  searchText = "",
  showInputSearch = false,
  whenChangingSearchText,
  textNewButton = "Novo",
  musterNewButton = true,
  whenClickingOnNew,
}) => {
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
      {showInputSearch && (
        <TextField
          size="small"
          value={searchText}
          onChange={(e) => whenChangingSearchText?.(e.target.value)}
          placeholder={Environment.SEARCH_INPUT}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {musterNewButton && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={whenClickingOnNew}
            endIcon={<Icon>add</Icon>}
          >
            {textNewButton}
          </Button>
        )}
      </Box>
    </Box>
  );
};

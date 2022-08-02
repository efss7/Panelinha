import {
  Drawer,
  useTheme,
  Avatar,
  Divider,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Icon,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAppDrawerContext } from "../../contexts";
interface IAppThemeProviderProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IAppThemeProviderProps> = ({ children }) => {
  const theme = useTheme();
  const smDown= useMediaQuery(theme.breakpoints.down('sm'));
  const {isDrawerOpen, toggleDrawerOpen} = useAppDrawerContext()
  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://github.com/efss7.png"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página inicial" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};

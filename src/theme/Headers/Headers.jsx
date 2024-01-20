import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: "h1",
                },
            },
            styleOverrides: {
                root: {
                    fontFamily: "Ferry",
                    fontWeight: 900,
                    fontSize: "46px",
                    lineHeight: "55px",
                    textTransform: "none",
                },
            },
        },
    },
});
export { theme };

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "11px",
                    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.2)",
                    padding: "22px",
                    margin: "0 30px",
                },
            },
        },
    },
});

export { theme };

import * as React from "react";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import axios from "axios";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const OfferCounter = () => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	const [userInfo, setUserInfo] = useState([]); 

	useEffect(() => {
		axios
			.get("/Mocks/response-objectsearch.json") 						// Запрос
			.then((result) => setUserInfo(result.data)) 					// получаем данные
			.then((result) => console.log(result.data))
			.catch((error) => console.log(error)); 
	}, []);
	return (
		<Box
			sx={{
				padding: matches ? "5px 2px" : "5px 14px",
				borderRadius: "5px",
				color: "rgba(0, 0, 0, 0.5)",
				flexGrow: 0,
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#d9d9d9",
				
			}}
		>
			{!userInfo.eventFiltersInfo ? (
				<div style={{ width: "150px", alignSelf: "center" }}>
					<CircularProgress />
				</div>
			) : (
				<>
					<Box>
						<ComponentText
							style={{
								textAlign: matches ? "left" : "right",
								fontSize: "10px",
								marginRight: matches ? "0" : "10px",
								display: matches ? "block" : "inline-block",
							}}
						>
							Использовано компаний
						</ComponentText>

						<ComponentText
							style={{
								margin: "0",
								fontSize: "14px",
								fontWeight: 700,
								textAlign: "left",
								display: matches ? "block" : "inline-block",
							}}
						>
							{userInfo.eventFiltersInfo.usedCompanyCount}
						</ComponentText>
					</Box>

					<Box>
						<ComponentText
							style={{
									fontSize: "10px",
									display: matches ? "block" : "inline-block",
									marginRight: matches ? "0" : "10px",
									textAlign: matches ? "left" : "right",
								
							}}
						>
							лимит по компаниям
						</ComponentText>

						<ComponentText
							style={{
									margin: "0",
									fontSize: "14px",
									textAlign: "left",
									display: matches ? "block" : "inline-block",
									fontWeight: 700,
									color: "#8AC540",
								
							}}
						>
							{userInfo.eventFiltersInfo.companyLimit}
						</ComponentText>
					</Box>
				</>
			)}
		</Box>
	);
};

export { OfferCounter };
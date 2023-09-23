import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Empresas() {
	const [empresas, setEmpresas] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8000/companies")
		.then((response) => {
			setEmpresas(response.data);
			console.log(response.data);
		})
		.catch((error) => {
			console.log("\nError en archivo Empresas.jsx en la consulta axios.get a /companies:")
			console.log(error);
		  });
	}, []);

	return (
		<>
			<div>
				<h2>Empresas</h2>
				<ul> {empresas.map((empresa, index) => (
						<li key={index}>{empresa}</li>
					))}
				</ul>
			</div>
		</>
	);
}
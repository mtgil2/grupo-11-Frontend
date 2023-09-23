import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Empresas() {
	const [empresas, setEmpresas] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8000/companies")
		.then((response) => {
			setEmpresas(response.data);
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
				<ul>
					{empresas.map((empresa, index) => (
						<li key={index}>
							Nombre empresa: {empresa.short_name}
							{/* <Link to={`/historia/${empresa.symbol}`}><button>Ver historial</button></Link> */}
							<Link to={`/historia/${empresa.symbol}`}>Ver historial</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
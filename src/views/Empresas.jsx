import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Empresas.css"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


export default withAuthenticationRequired(function Empresas() {
	const [empresas, setEmpresas] = useState([]);
	const { user } = useAuth0();

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
				<h2>hola</h2>
				<h2>{user.sub}</h2>
          		<h2>chao</h2>
				<ul>
					{empresas.map((empresa, index) => (
						<li>
							{empresa.short_name}
							<Link to={`/historia/${empresa.symbol}`}>Ver historial</Link>
						</li>
					))}
				</ul>
				<Link to={`/profile`}><button>Volver</button></Link>
			</div>
		</>
	);
});
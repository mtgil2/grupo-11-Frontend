import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Estilo.css"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


export default withAuthenticationRequired(function Acciones() {
	const [acciones, setAcciones] = useState([]);
	const { user } = useAuth0();

	useEffect(() => {
    const userid = {
      user_id: user.sub,
    };
		axios.post("http://localhost:8000/companies", userid) //cambiar
		.then((response) => {
			setAcciones(response.data);
		})
		.catch((error) => {
			console.log("\nError en archivo Empresas.jsx en la consulta axios.get a /companies:")
			console.log(error);
		  });
	}, []);

	return (
		<>
			<div>
				<h2>Acciones compradas</h2>
				<ul>
					{acciones.map((accion, index) => (
						<li key={empresa.symbol}>
							{accion.short_name}
						</li>
					))}
				</ul>
				<Link to={`/empresas`}><button>Volver</button></Link>
			</div>
		</>
	);
});
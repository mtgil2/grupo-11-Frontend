import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Estilo.css"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container, Row, Col, Table } from "reactstrap";


export default withAuthenticationRequired(function Empresas() {
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
				<Row>
					<Col>
						<h2>Empresas</h2>
						<Table>
							<thead>
								<tr>
								<th>Nombre empresa</th>
								<th>Símbolo empresa</th>
								<th>Historial</th>
								</tr>
							</thead>
							<tbody>
								{empresas.map((empresa) => (
									<tr key={empresa.symbol}>
										<td>{empresa.short_name}</td>
										<td>{empresa.symbol}</td>
										<td>
										<Link to={`/historia/${empresa.symbol}`}>
											<button className="boton">Ver historial</button>
										</Link>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col>
						<Link to={`/Acciones`}>
							<button className="boton">Ver Acciones</button>
						</Link>
					</Col>
				</Row>
				<Row>
					<Col>
						<Link to={`/profile`}>
							<button className="boton">Volver</button>
						</Link>
					</Col>
				</Row>
			</div>
		</>
	);
});
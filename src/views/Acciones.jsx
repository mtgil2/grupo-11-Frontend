import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Estilo.css"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container, Row, Col, Table } from "reactstrap";


export default withAuthenticationRequired(function Acciones() {
	const [acciones, setAcciones] = useState([]);
	const { user, getIdTokenClaims } = useAuth0();
	const [loading, setLoading] = useState(true);

	const accessToken = getIdTokenClaims();

	useEffect(() => {
		setLoading(true);
		
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${user.sub}/purchases`, {
			headers: {
				'Authorization': 'Bearer ' + accessToken.__raw,
			}})
		.then((response) => {
			setAcciones(response.data);
			console.log(response.data);
			setLoading(false);
		})
		.catch((error) => {
			console.log("\nError en archivo Acciones.jsx en la consulta axios.post a /companies:")
			console.log(error);
			setLoading(true);
		  });
	}, []);

	return (
		<>
			<div>
				<Row>
					<Col>
						<h2>Acciones Compradas</h2>
						{loading ? (
							<p>Cargando...</p>
						) : acciones.length === 0 ? (
								<p>No hay acciones compradas</p>
						) : (
								<Table>
									<thead>
										<tr>
										<th>Símbolo empresa</th>
										<th>Cantidad comprada</th>
										<th>Precio de compra</th>
										<th>Status compra</th>
										</tr>
									</thead>
									<tbody>
										{acciones.map((accion) => (
											<tr key={accion.request_id}>
											<td>{accion.symbol}</td>
											<td>{accion.quantity}</td>
											<td>{accion.cost}</td>
											<td>{accion.status}</td>
											</tr>
										))}
									</tbody>
								</Table>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						<Link to={`/empresas`}>
							<button className="boton">Volver</button>
						</Link>
					</Col>
				</Row>
			</div>
		</>
	);
});
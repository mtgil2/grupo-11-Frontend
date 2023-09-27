import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Estilo.css"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container, Row, Col, Table } from "reactstrap";



export default withAuthenticationRequired(function Historia() {
	const { symbol } = useParams();
  	const [historial, setHistorial] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [cantidadAcciones, setCantidadAcciones] = useState(0);
	const { user } = useAuth0();


	useEffect(() => {
		setLoading(true);
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/stocks/${symbol}?page=${page}`)
		.then((response) => {
			setHistorial(response.data);
			setLoading(false);
		})
		.catch((error) => {
			console.log("\nError en archivo Historia.jsx en la consulta axios.get a /stocks/:symbol:")
			console.log(error);
			setLoading(true);
		});
	}, [page]);

	const nextPage = () => {
		if (historial.length < 5) {
			return;
	  	}
		setPage(page + 1);
	};
	
	const prevPage = () => {
		if (page > 1) {
		  	setPage(page - 1);
		}
	};

	const comprar_acciones = (user) => {
		const fechaActual = new Date();
		const datosCompra = {
			user_id: user.sub,
			symbol: symbol,
			quantity: cantidadAcciones,
			datetime: fechaActual.toISOString(),
		};

		axios.post(`${process.env.REACT_APP_BACKEND_URL}/comprar/`, datosCompra)
		.then((response) => {
			console.log(response.data);
			history.push('/acciones');
		})
		.catch((error) => {
			console.log("\nError en archivo Historia.jsx en la consulta axios.post a /comprar/");
			console.log(error);
		});
	  };

	return (
		<>
			<Container>
				<Row>
					<Col>
						<h2>Historial de precios de {symbol}</h2>
						{loading ? (
							<p>Cargando...</p>
						) : historial.length === 0 ? (
							<p>No hay historial para esta compañía.</p>
						) : (
							<Table>
								<thead>
									<tr>
									<th>Fecha</th>
									<th>Hora</th>
									<th>Precio</th>
									<th>Moneda</th>
									</tr>
								</thead>
								<tbody>
									{historial.map((registro, index) => (
									<tr key={index}>
										<td>{registro.datetime.split('T')[0]}</td>
										<td>{registro.datetime.split('T')[1].slice(0, 8)}</td>
										<td>{registro.price}</td>
										<td>{registro.currency}</td>
									</tr>
									))}
								</tbody>
							</Table>
						)}
						<Row>
							<Col>
								<div className="button-container">
									<button className={`flecha ${page === 1 && 'disabled'}`} onClick={prevPage} disabled={page === 1}>
										&lt;
									</button>
									<button className={`flecha ${historial.length < 5 && 'disabled'}`} onClick={nextPage} disabled={historial.length < 5}>
										&gt;
									</button>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className="input-container">
									<input
										type="number"
										placeholder="Cantidad de acciones"
										value={cantidadAcciones}
										onChange={(e) => setCantidadAcciones(e.target.value)}
										className="input"
									/>
									<button className="boton margen" onClick={() => comprar_acciones(user)}>
										Comprar
									</button>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col>
						<Link to={`/empresas`}>
							<button className="boton margen">Volver</button>
						</Link>
						<Link to={`/acciones`}>
							<button className="boton margen">Ver Acciones</button>
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	);
});
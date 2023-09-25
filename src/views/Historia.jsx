import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Estilo.css"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container, Row, Col } from "reactstrap";



export default withAuthenticationRequired(function Historia() {
	const { symbol } = useParams();
  	const [historial, setHistorial] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [cantidadAcciones, setCantidadAcciones] = useState(0);
	const { user } = useAuth0();

	useEffect(() => {
		setLoading(true);
		axios.get(`http://localhost:8000/stocks/${symbol}?page=${page}`)
		.then((response) => {
			setHistorial(response.data);
			setLoading(false);
		})
		.catch((error) => {
			console.log("\nError en archivo Historia.jsx en la consulta axios.get a /stocks/:symbol:")
			console.log(error);
			setLoading(false);
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

		axios.post('http://localhost:8000/comprar/', datosCompra)
		.then((response) => {
			// Manejar la respuesta del servidor si es necesario
			console.log(response.data);
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
					<ul>
					{loading ? (
						<p>Cargando...</p>
					) : historial.length === 0 ? (
						<p>No hay historial para esta compañía.</p>
					) : (
						historial.map((registro, index) => (
						<li key={index}>
							Fecha: {registro.datetime}, Precio: {registro.price}, Moneda: {registro.currency}
						</li>
						))
					)}
					</ul>
					<Row>
					<Col>
						<button onClick={prevPage} disabled={page === 1}>Anterior</button>
						<button onClick={nextPage}>Siguiente</button>
					</Col>
					</Row>
					<Row>
					<Col>
						<input
						type="number"
						placeholder="Cantidad de acciones"
						value={cantidadAcciones}
						onChange={(e) => setCantidadAcciones(e.target.value)}
						/>
						<button onClick={() => comprar_acciones(user)}>Comprar</button>
					</Col>
					</Row>
				</Col>
				</Row>
				<Row>
				<Col>
					<Link to={`/empresas`}><button>Volver</button></Link>
				</Col>
				</Row>
			</Container>
		</>
	  );
	  
});
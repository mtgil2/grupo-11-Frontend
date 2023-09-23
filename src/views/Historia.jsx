import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Historia() {
	const { symbol } = useParams();
  	const [historial, setHistoria] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setLoading(true);
		axios.get(`http://localhost:8000/stocks/${symbol}?page=${page}`)
		.then((response) => {
			setHistoria(response.data);
			setLoading(false);
		})
		.catch((error) => {
			console.log("\nError en archivo Historia.jsx en la consulta axios.get a /stocks/:symbol:")
			console.log(error);
			setLoading(false);
		});
	}, [page]);

	const nextPage = () => {
		setPage(page + 1);
	};
	
	const prevPage = () => {
		if (page > 1) {
		  	setPage(page - 1);
		}
	};

	return (
		<>
			<div>
				<h2>Historia de</h2>
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
				<div>
					<button onClick={prevPage} disabled={page === 1}>Anterior</button>
					<button onClick={nextPage}>Siguiente</button>
				</div>
				<Link to={`/acciones`}>
					<button>Comprar</button>
				</Link>
      		</div>
		</>
	);
	}
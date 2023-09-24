import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";


export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [cantidadPlata, setCantidadPlata] = useState(0);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-jgor463dhotlvfgo.us.auth0.com";
      try {
        const accessToken = await getIdTokenClaims();
        console.log("accessToken:", accessToken)

        const jsonResponse = JSON.parse(accessToken);
        const jwt = jsonResponse.__raw;

        fetch(`https://${domain}/api/v2/)`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response failed');
          }
          return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))

      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  });

  const agregar_plata = (user) => {
		console.log("Usuario: " + user);
    console.log("Cantidad de plata: " + cantidadPlata);
		const datosPlata = {
		cantidad: cantidadPlata,
		user: user,
		};

		axios.post('http://localhost:8000/addmoney/', datosPlata)
		.then((response) => {
			// Manejar la respuesta del servidor si es necesario
		})
		.catch((error) => {
			console.log("\nError en archivo Profile.jsx en la consulta axios.post a /addmoney/");
			console.log(error);
		});
	  };

  // console.log(user.user_metadata);
  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
          <h2>Bienvenid@, {user.name}</h2>
        </Col>
        <Col md>
          <p>Agrega plata a tu billeteria virtual</p>
          <input
          type="number"
          placeholder="Cantidad de plata"
          value={cantidadPlata}
          onChange={(e) => setCantidadPlata(e.target.value)}
          />
        </Col>
        <button onClick={agregar_plata}>Agregar plata</button>
      </Row>
      <Link to="/empresas"><button>Ver empresas</button></Link>
    </Container>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});

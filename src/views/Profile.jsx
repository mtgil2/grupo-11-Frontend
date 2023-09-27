import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";


export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [cantidadPlataAgregar, setCantidadPlataAgregar] = useState(0);
  const [plataBilletera, setPlataBilletera] = useState(0);

  const accessToken = getIdTokenClaims();


  useEffect(() => {
    const datosPlata = {
      user_id: user.sub,
      plata: 0,
		};
		axios.post(`https://7opxtzovvg.execute-api.us-east-1.amazonaws.com/testStage/add_money`, datosPlata, {
			headers: {
				'Authorization': 'Bearer ' + accessToken.__raw,
			}})
		.then((response) => {
      setPlataBilletera(response.data);
		})
		.catch((error) => {
			console.log("\nError en archivo Profile.jsx en la consulta axios.post a /add_money/");
			console.log(error);
		});
  }, []);

  
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-jgor463dhotlvfgo.us.auth0.com";
      try {
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

  const agregar_plata = (user, accessToken) => {
		const datosPlata = {
      user_id: user.sub,
      plata: parseFloat(cantidadPlataAgregar),
		};
		axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_money`, datosPlata, {
			headers: {
				'Authorization': 'Bearer ' + accessToken,
			}})
		.then((response) => {
      setPlataBilletera(response.data);
		})
		.catch((error) => {
			console.log("\nError en archivo Profile.jsx en la consulta axios.post a /add_money/");
			console.log(error);
		});
	  };

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
          <p>Actualmente tienes en tu billtera virtual</p>
          <p>{plataBilletera.toFixed(2)}</p>
        </Col>
        <Col md>
          <p>Agrega plata a tu billeteria virtual</p>
          <input
          type="number"
          placeholder="Cantidad de plata"
          value={cantidadPlataAgregar}
          onChange={(e) => setCantidadPlataAgregar(e.target.value)}
          className="input"
          />
        </Col>
        <button className="boton" onClick={() => agregar_plata(user, accessToken.__raw)}>Agregar plata</button>
      </Row>
      <Link to="/empresas"><button className="boton">Ver empresas</button></Link>
    </Container>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import NumericInput from "../components/NumericInput";
import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import BusinessButton from "../components/BusinessButton";
import HistoryButton from "../components/HistoryButton";
import StocksButton from "../components/StocksButton";

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-jgor463dhotlvfgo.us.auth0.com";
      try {
        const accessToken = await getIdTokenClaims();
        console.log(accessToken)

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

  console.log(user.user_metadata);
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
          <p>Ahora mismo tienes {user.user_metadata} pesos en tu cuenta.</p>
          <NumericInput/>
        </Col>
      </Row>
      <BusinessButton/>
      <HistoryButton/>
      <StocksButton/>
    </Container>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});

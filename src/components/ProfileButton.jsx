import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function ProfileButton() {
    const { isAuthenticated} = useAuth0();

    return isAuthenticated && (
        <button>
            <Link to="/profile">Perfil</Link>
        </button>
    );
}

export default ProfileButton;
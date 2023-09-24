import React from 'react';
import { Link } from 'react-router-dom';

function BusinessButton() {

    return(
        <button>
            <Link to="/empresas">Ir a Empresas</Link>
        </button>
    );
}

export default BusinessButton;
import React from 'react';
import { Link } from 'react-router-dom';

function StocksButton() {

    return(
        <button>
            <Link to="/acciones">Ir a Acciones</Link>
        </button>
    );
}

export default StocksButton;
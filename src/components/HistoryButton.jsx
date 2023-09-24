import React from 'react';
import { Link } from 'react-router-dom';

function HistoryButton() {

    return(
        <button>
            <Link to="/historia">Ir a Historia</Link>
        </button>
    );
}

export default HistoryButton;
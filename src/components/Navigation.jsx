import React from 'react';
import '../styles.css';
import { Link } from "react-router-dom";
function Navigation(){
    return(
<nav className="nav-bar">
    <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favorites">Favourites</Link></li>
    </ul>
</nav>

    )
}

export default Navigation;
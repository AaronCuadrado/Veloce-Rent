import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../../styles/navbar/navbarAfter.css";
import logo from "../../img/logo1.png";
import { Context } from "../store/appContext";

export const NavbarAfterLogin = () => {
    const { store, actions } = useContext(Context); 
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    const navigate = useNavigate();

    const toggleHamburgerMenu = () => {
        setShowHamburgerMenu(!showHamburgerMenu);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(
                "https://vigilant-system-pj7pv9xx997pf97x5-3001.app.github.dev/api/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (response.ok) {
                console.log("Sesión cerrada exitosamente");
                actions.logout();
                setShowHamburgerMenu(false);
                navigate("/");
            } else {
                console.error("Error al cerrar sesión");
            }
        } catch (error) {
            console.error(
                "Error al conectar con el backend para cerrar sesión:",
                error
            );
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-container">
                {/* Logo de la web */}
                <div className="navbar-logo">
                    <Link to="/home">
                        <img src={logo} alt="Veloce logo" className="logo" />
                    </Link>
                    <span className="navbar-title">Veloce Rent</span>
                </div>

                {/* Menú después de iniciar sesión */}
                <div className="navbar-buttons">
                    <Link to="/vehicles" className="navbar-link">
                        Ver Vehículos
                    </Link>
                    {store.user?.is_admin && (
                        <>
                            <Link to="/admin/add-vehicle" className="navbar-link">
                                Añadir Vehículo
                            </Link>
                            <Link to="/admin/manage-vehicles" className="navbar-link">
                                Gestionar Vehículos
                            </Link>
                        </>
                    )}
                    <div className="hamburger-menu">
                        <button
                            className="hamburger-icon"
                            onClick={toggleHamburgerMenu}
                        >
                            &#9776; {/*codigo para menu hamburguesa*/}
                        </button>
                        {showHamburgerMenu && (
                            <div className="hamburger-dropdown">
                                <Link to="/profile" className="navbar-link">
                                    Mi Perfil
                                </Link>
                                <Link className="navbar-link">
                                    Mis Reservas
                                </Link>
                                <button
                                    className="navbar-link logout-button"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
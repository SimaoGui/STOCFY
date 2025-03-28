import React, { useState, useEffect, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/home.module.scss";

const Sidebar = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsActive(!isActive);
      };

      const inicio = () => {
        navigate("/homePage");
      };

      const listagem = () => {
        navigate("/listagem");
      };

      const premium = () => {
        navigate("premium-area")
      };

      const handleLogout = () => {
        sessionStorage.removeItem("auth");
        window.location.href = "/login";
      };
      
    return (
        <div className={`${styles.sideBar} ${isActive ? styles.active : ''}`}>
            <div className={styles.sideLog}>
                <button onClick={handleLogout} className={styles.logoutbtn}>
                    <div className={styles.sign}><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></div>
                    <div className={styles.text}>Logout</div>
                </button>
            </div>
            
            <div className={styles.sideItem} onClick={toggleSidebar}>
                <i className='bx bxl-dropbox iconSideBar'></i>
                <h2 className={styles.homeh2}>STOCFY</h2>
            </div>
            <div className={styles.sideItem} onClick={inicio}>
                <i className='bx bx-home iconSideBar'></i>
                <h2 className={styles.homeh2}>Dashboards</h2>
            </div>
            <div className={styles.sideItem} onClick={listagem}>
                <i className='bx bx-list-ol iconSideBar'></i>
                <h2 className={styles.homeh2}>Listar Itens</h2>
            </div>
            <div className={styles.sideItem} onClick={premium}>
                <i className='bx bxl-sketch iconSideBar' ></i>
                <h2 className={styles.homeh2}>Área Premium</h2>
            </div>
        </div>
    )
        



}

export default Sidebar;
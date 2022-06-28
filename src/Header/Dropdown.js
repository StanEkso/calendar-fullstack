import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./Header.module.css"
function Dropdown({ state }) {
    const auth = useContext(AuthContext)
    if (!state) return null;
    return (
        <div className={styles.dropdown}>
            <ul>
                <li><Link to='/'>На главную</Link></li>
                <li><Link to='/admin'>Администрирование</Link></li>
                <li><Link to='/views'>Просмотренные посты</Link></li>
                
                <li><Link to='/' onClick={auth.logout}>Выход</Link></li>
            </ul>
        </div>
    )
}

export default Dropdown;
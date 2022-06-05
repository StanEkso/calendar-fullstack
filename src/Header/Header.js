import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import styles from "./Header.module.css"
function Header() {
    const auth = useContext(AuthContext);
    const [dropdown, setDropdown] = useState(false)
    return (
        <header className={styles.block}>
            <div className={styles.container}>
                {auth.isAuthenticated && 
                    <div className={styles.profile}>
                        <span className={styles.avatar}></span>
                        <div className={styles.menu} onClick={() => setDropdown(!dropdown)}>
                            <Dropdown state={dropdown}/>
                        </div>
                    </div>
                }
                {!auth.isAuthenticated && <div className={styles.profile}>
                    <button className={styles.login}>
                        <Link to="login">Войти</Link>
                    </button>
                </div>}
            </div>
        </header>
    )
}

export default Header
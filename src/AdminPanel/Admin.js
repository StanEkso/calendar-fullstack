import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Posts from "../Home/Posts";
import { useAuth } from "../hooks/auth.hook";
import AppendForm from "./AppendForm";
import styles from './Admin.module.css';
function Admin({ setModal }) {
    const { request } = useAuth()
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    if (!auth.isAuthenticated) {
        navigate('/');
        setModal({active: true, text: "You is not admin!", setActive: () => setModal({active: false})})
    }
    
    return (
        <div className={styles.container}>
            <h2>Админ панель</h2>
            <AppendForm/>
            <Posts admin={true}/>
        </div>
    )
}

export default Admin;
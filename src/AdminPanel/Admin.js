import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Posts from "../Home/Posts";
import AppendForm from "./AppendForm";
import styles from './Admin.module.css';
function Admin({ setModal }) {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    
    useEffect(() => {if (!auth.isAuthenticated) {
        navigate('/');
        setModal({active: true, text: "You is not admin!", setActive: () => setModal({active: false})})
    }},[])
    return (
        <div className={styles.container}>
            <h2>Админ панель</h2>
            <AppendForm setModal={setModal}/>
            <Posts admin={true}/>
        </div>
    )
}

export default Admin;
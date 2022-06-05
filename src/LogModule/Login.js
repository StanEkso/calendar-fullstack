import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import styles from './Log.module.css'
import { hostname_dev, hostname_prod} from "../configs/host"
function Login({ setModal }) {
    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    const {request, loading} = useHttp()
    const [form, setForm] = useState(
        {username: '', password: ''}
    )
    const formHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const loginHandler = async () => {
        try {
            const data = await request(`${hostname_prod}/auth/login`, 'post', {...form});
            if (data.message) return setModal({active: true, text: data.message, setActive: () => setModal({active: false})})
            auth.login(data.token, data.id)
            navigate('/')
        } catch (error) {
            
        }
    }
    return (
        <div className={styles.container}>
            <h3>Вход в систему</h3>
            <form onSubmit={(event) => event.preventDefault()} className={styles.main}>
                <label htmlFor="username">Логин</label>
                <input name="username" type="text" onChange={formHandler}/>
                <label htmlFor="password">Пароль</label>

                <input name="password" type="password" onChange={formHandler}/>
                <button onClick={loginHandler} disabled={loading} className={styles.log}>Войти</button>
            </form>
        </div>
    )
}

export default Login
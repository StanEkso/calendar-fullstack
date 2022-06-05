import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";
import styles from './Log.module.css'
import { hostname_dev, hostname_prod} from "../configs/host"
function Register({setModal}) {
    const {request} = useHttp()
    const [form, setForm] = useState(
        {username: '', password: ''}
    )
    const formHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request(`${hostname_prod}/auth/signup`, 'POST', {...form});
            if (data.message) setModal({active: true, text: data.message, setActive: () => setModal({active: false})})
        } catch (error) {
            
        }
    }
    return (
        <div className={styles.container}>
            <h3>Register</h3>
            <form onSubmit={(event) => event.preventDefault()} className={styles.main}>
                <input name="username" type="text" onChange={formHandler}/>
                <input name="password" type="text" onChange={formHandler}/>
                <button onClick={registerHandler}>Зарегистрироваться</button>
            </form>
        </div>
    )
}

export default Register
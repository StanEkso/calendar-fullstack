import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import styles from "./Admin.module.css"
import { baseUrl } from "../configs/config";
import { AuthContext } from "../context/AuthContext";
import closeIcon from '../close.svg';
function AppendForm({ setModal }) {
    const auth = useContext(AuthContext)
    const {request} = useHttp();
    const [state, setState] = useState(false);
    const [form, setForm] = useState({title: '', date: Date.now()})
    const appendHandler = async () => {
        try {
            const data = await request(`${baseUrl}/posts/create`, 'post', {...form}, {
                'Authorization': `Bearer ${auth.token}`
            });
            setState(false);
        } catch (error) {
            setModal({active: true, text: "You isn't authenicated", setActive: () => setModal({active: false})})
            auth.logout();
            setState(false);
        }
    }
    return (
        <div className={styles.form}>
            <button onClick={() => setState(true)}>Создать событие</button>
            {state && <div className={styles.overlay}>
                <div className={styles.append}>
                     <h4>Добавление события</h4>
                    <button className={styles.exit} onClick={() => setState(false)}><img src={closeIcon}/></button>
                    <label htmlFor="title">Название</label>
                    <input type="text" placeholder="Название"
                        name="title"
                        onChange={(event) => setForm({...form, [event.target.name]: event.target.value})}
                    />
                      <label htmlFor="date">Дата</label>
                    <input name="date" type="datetime-local" 
                        onInput={(event) => setForm({...form, [event.target.name]: new Date(event.target.value) / 1})}
                    />
                    <button onClick={appendHandler}>Добавить</button>
                </div>
            </div>}
        </div>
        
    )
}

export default AppendForm;
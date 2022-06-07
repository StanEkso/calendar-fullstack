import React, { useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import styles from "./Admin.module.css"
import { baseUrl } from "../configs/config";
import { AuthContext } from "../context/AuthContext";
function EditForm({title, date, state, setState, id}) {
    const auth = useContext(AuthContext)
    const {request} = useHttp();
    const [form, setForm] = useState({title: title, date: date})
    const appendHandler = async () => {
        try {
                const post = await request(`${baseUrl}/posts/`, "PUT", {...form, id: id}, {
                    'Authorization': `Bearer ${auth.token}`
                });
                setState(false)
        } catch (error) {
            setState(false)
            
        }
    }
    return (
        <div className={styles.form}>
            {state && <div className={styles.overlay}>
                <div className={styles.append}>
                    <button onClick={() => setState(false)}>Закрыть</button>
                    <label htmlFor="title">Название</label>
                    <input type="text" placeholder="Название"
                        name="title"
                        onChange={(event) => setForm({...form, [event.target.name]: event.target.value})}
                        value={form.title}
                    />
                      <label htmlFor="date">Дата</label>
                    <input name="date" type="datetime-local" 
                        onInput={(event) => setForm({...form, [event.target.name]: new Date(event.target.value) / 1})}
                    />
                    <button onClick={(appendHandler)}>Сохранить</button>
                </div>
            </div>}
        </div>
        
    )
}

export default EditForm;
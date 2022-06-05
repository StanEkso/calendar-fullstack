import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";
import styles from "./Admin.module.css"
import { hostname_dev, hostname_prod} from "../configs/host"
function AppendForm() {
    const {request} = useHttp();
    const [state, setState] = useState(false);
    const [form, setForm] = useState({title: '', date: Date.now()})
    console.log(form)
    const appendHandler = async () => {
        try {
            const data = await request(`${hostname_prod}/posts/create`, 'post', {...form});
            setState(false);
        } catch (error) {
            
        }
    }
    return (
        <div className={styles.form}>
            <button onClick={() => setState(true)}>Создать событие</button>
            {state && <div className={styles.overlay}>
                <div className={styles.append}>
                    <button onClick={() => setState(false)}>Закрыть</button>
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
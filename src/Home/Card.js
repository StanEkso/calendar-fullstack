import React, { useContext, useState } from "react";
import styles from "./Home.module.css";
import { useHttp } from "../hooks/http.hook";
import { baseUrl } from "../configs/config";
import EditForm from "../AdminPanel/EditForm";
import { AuthContext } from "../context/AuthContext";
import lastTime from "../functions/lastTime";
import stringFromDate from "../functions/stringFromDate";
function Card({ id, date, title, admin = false }) {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const postDeleteHandler = async (id) => {
        try {
            const post = await request(`${baseUrl}/posts/${id}`, "DELETE", null, {
                'Authorization': `Bearer ${auth.token}`
            });
        } catch (error) {
            auth.logout();
            setState(false);
        }
    }
    const [state, setState] = useState(false);
    const [ext, setExt] = useState(false);
    date = new Date(Number(date));
    const nowdata = new Date();
    const { time, datestring } = stringFromDate(date);
    let difst = lastTime(date - nowdata);
    return (
        <div className={styles.card}>

            <h4>{title}</h4>

            <p>
                <span className={styles.time}>
                    {time}
                </span>
                {datestring}
            </p>
            {!!difst > 0 && <p>Осталось {difst}</p>}
            {date < nowdata && <p className={styles.expired}>ПРОШЛО</p>}
            {admin && <div className={`${styles.editing}${ext ? ' ' + styles.editing_active : ''}`} onClick={() => setExt(!ext)}>
                <button className={styles.remove} onClick={() => postDeleteHandler(id)}>Удалить</button>
                <button className={styles.edit} onClick={() => setState(true)}>Изменить</button>
                <EditForm state={state} setState={setState} title={title} date={date} id={id} />
            </div>}

        </div>
    )
}

export default Card;
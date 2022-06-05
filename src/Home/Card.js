import React, {useState} from "react";
import styles from "./Home.module.css";
import formstyle from '../AdminPanel/Admin.module.css';
import { useHttp } from "../hooks/http.hook";
import { hostname_dev, hostname_prod} from "../configs/host"
function Card({ id, date, title, admin = false}) {
    const {request} = useHttp();
    const postDeleteHandler = async (id) => {
        const post = await request(`${hostname_prod}/posts/${id}`, "DELETE");
    }
    date = new Date(Number(date));
    const nowdata = new Date();
    const months = [
        '','января', 'февраля','марта','мая','июня','июля','августа','сентября','октрября','ноября','декабря'
    ]
    let time = ''
    if (date.getHours() > 10) time+=date.getHours();
    else time+='0' + date.getHours();
    time+=':';
    time+=date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()
    const datestring = date.getDate() + ' ' + months[date.getMonth()] + ", " + date.getFullYear()
    return (
        <div className={styles.card}>
            {date < nowdata && <p className={styles.expired}>НЕ АКТУАЛЬНО</p>}
            <h4>{title}</h4>
            <p className={styles.time}>
                {time}
            </p>
            <p>{datestring}</p>
            {admin && <div className={styles.editing}>
                <button className={styles.remove} onClick={() => postDeleteHandler(id)}>Удалить</button>
                </div>}
        </div>
    )
}

export default Card;
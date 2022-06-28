import React, {useState} from "react";
import ViewExtended from "./ViewExtended";
import styles from './Views.module.css';
import { useHttp } from "../hooks/http.hook";
import { baseUrl } from "../configs/config";
import closeIcon from '../close.svg'
function ViewCard({ post }) {
    const [active, setActive] = useState(false);
    const { request, loading } = useHttp();

    const deleteHandler = async () => {
        const response = await request(baseUrl+"/views/delete","DELETE", {
            name: post.table_name.split("view_").pop()
        })
        console.log(response)
    }
    return (
        <div className={styles.body}>
            <button className={styles.close} onClick={deleteHandler}><img src={closeIcon}/></button>
            <h2>Пост {post.table_name}</h2>
            <button className={styles.more_info} onClick={() => setActive(true)}>Подробнее</button>
            {active &&<ViewExtended title={post.table_name} setActive={setActive}/>}
        </div>
    )
}

export default ViewCard
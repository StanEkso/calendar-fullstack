import React from "react";
import styles from './Views.module.css';
import { useHttp } from "../hooks/http.hook";
import { baseUrl } from "../configs/config";
import { useEffect, useState, useMemo } from "react";
import closeIcon from '../close.svg';
import Diagram from "../Diagram/Diagram";
function ViewExtended({ title, active, setActive }) {
    const base = useMemo(() => title.split("view_").pop(), [title])
    const { request, loading } = useHttp();

    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getData() {
            const data = await request(`${baseUrl}/views/${base}`, 'GET');
            console.log(data)
            setPosts(data)
        }
        getData()
    }, [])
    return (
        <div className={styles.extended}>
            <div className={styles.info}>
                <button className={styles.close} onClick={() => setActive(false)}>
                    <img src={closeIcon}/>
                </button>
                <h4>Информация по посту {base}</h4>
                <Diagram value={posts.length} maxValue={16}/>
                <p>Список отметивших как прочитанное:</p>
                <ol>
                    {posts.map(post => {
                        return <li key={post.id}>{post.firstname} (@{post.username}), tg: {post.tg_id}</li>
                    })}
                </ol>
            </div>
        </div>
    )
}

export default ViewExtended
import React, {useEffect, useMemo, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import Card from "./Card";
import styles from "./Home.module.css"
import { hostname_dev, hostname_prod} from "../configs/host"
function Posts({ admin }) {
    const { request, loading } = useHttp();

    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getData() {
            const data = await request(`${hostname_prod}/posts/`, 'GET');
            setPosts(data.sort())
        }
        getData()
    }, [])
    return (
        <div className={styles.container}>
            {loading && <p>Загружается</p> }
            {!loading && posts.length == 0 && <p>Нет постов.</p>}
            {posts.map(post => 
                <Card title={post.title} date={post.date} admin={admin} id={post.id}/>
            ) }
        </div>
    )
}

export default Posts;
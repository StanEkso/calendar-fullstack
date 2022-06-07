import React, {useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import Card from "./Card";
import styles from "./Home.module.css"
import { baseUrl } from "../configs/config";
function Posts({ admin }) {
    const { request, loading } = useHttp();

    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getData() {
            const data = await request(`${baseUrl}/posts/`, 'GET');
            data.sort((a,b) => a.date-b.date)
            setPosts(data)
        }
        getData()
    }, [])
    return (
        <div className={styles.container}>
            {loading && <p>Загружается</p> }
            {!loading && posts.length == 0 && <p>Нет постов.</p>}
            {posts.map(post => 
                <Card title={post.title} date={post.date} admin={admin} id={post.id} key={post.id}/>
            ) }
        </div>
    )
}

export default Posts;
import React from "react";
import ViewCard from "./ViewCard";
import styles from './Views.module.css';
import { useHttp } from "../hooks/http.hook";
import { baseUrl } from "../configs/config";
import { useEffect, useState } from "react";
function ViewScreen({  }) {
    const { request, loading } = useHttp();

    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getData() {
            console.log(`${baseUrl}/views/`)
            const data = await request(`${baseUrl}/views/`, 'GET');
            console.log(data)
            setPosts(data["table_names"])
        }
        getData()
    }, [])
    return (
        <div className={styles.container}>
            {loading && <p>Загружается...</p>}
            {posts.map(post => <ViewCard post={post}/>)}
        </div>
    )
}

export default ViewScreen
import React, { useState } from "react";
import styles from "./Diagram.module.css"
function Diagram({ value, maxValue }) {
    const percentage = value / maxValue;
    return (
        <div className={
            `${styles.main}${percentage >= 0.5 ?
             ` ${styles.active}` : ''}`}
             >
            <div className={styles.line}
                style={{transform: `rotate(${percentage*360}deg)`}}/>
            <div className={styles.body}>
                {value}/{maxValue}
            </div>
        </div>
    )
}

export default Diagram
import React from "react";
import styles from './Modal.module.css'
function Modal({ modal }) {
    const {active, text, setActive} = modal
    if (!active) return null;
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <h3 className={styles.title}>{text}</h3>
                <button 
                   className={styles.off}
                   onClick={() => setActive(false)}
                >
                    Закрыть
                </button>
            </div>
        </div>
    )
}

export default Modal;
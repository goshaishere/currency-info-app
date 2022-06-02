import React from "react"
import styles from './404.module.scss'

export const NotFound = () => {
    return (
        <div className={styles.notfound}>
            <p>Страница не найдена</p>
            <p>404</p>
        </div>
    )
}
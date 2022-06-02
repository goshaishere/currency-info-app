import React from "react"
import styles from './Layout.module.scss'
import { Outlet } from 'react-router-dom'
import { CustomLink } from '../customLink/CustomLink'

export const Layout = () => {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <CustomLink to='/'><div className={styles.link_btn}>Converter</div></CustomLink>
                    <CustomLink to='/rates'><div className={styles.link_btn}>Rates</div></CustomLink>
                </div>
            </header>

            <main className="main-container">
                <Outlet />
            </main>

            <footer className={styles.footer}>
                <div className={styles.footcontent}>
                    <div>&#169; goshaishere 2022</div>
                </div>
            </footer>
        </>
    )
}
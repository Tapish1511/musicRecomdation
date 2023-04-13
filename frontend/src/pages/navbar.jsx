import React from "react";
import { Link } from "react-router-dom";
import styles from '../css/nav.module.css'


function NavBar(){

    return(
        <>
            <nav className={styles.navContainer}>
                <div className={styles.Name}>
                    <h1>Music Recommendation</h1>
                </div>
                <div className={styles.navItems}>
                    <ul className={styles.navItemList}>
                        <li><Link to='/about'>About us</Link></li>
                        <li><a href="https://github.com/Tapish1511/musicRecomdation" target="_blank">Code</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar
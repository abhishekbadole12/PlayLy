import styles from "./SideMenu.module.css"
import { CiGrid42 } from "react-icons/ci";
import { BiLogInCircle } from "react-icons/bi";

export default function SideMenu() {
    return (
        <aside className={styles.sideMenu}>
            <h2 className={styles.projectTitle}>Playly</h2>

            <ul className={styles.asideItems}>
                <li className={styles.asideItem}>
                    <CiGrid42 />
                    <p>Songs</p>
                </li>

                <li className={styles.asideItem}>
                    <BiLogInCircle />
                    <p>Logout</p>
                </li>
            </ul>

        </aside>
    )
}
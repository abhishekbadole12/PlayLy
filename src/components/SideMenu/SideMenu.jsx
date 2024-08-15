import styles from "./SideMenu.module.css"
import { CiGrid42 } from "react-icons/ci";
import { BiLogInCircle } from "react-icons/bi";

export default function SideMenu() {
    return (
        <div className={styles.sideMenu}>
            <h2>Playly</h2>

            <ul>
                <li>
                    <CiGrid42 size={25} />
                    <p>Songs</p>
                </li>

                <li className={styles.logout}>
                    <BiLogInCircle size={25} />
                    <p>Logout</p>
                </li>
            </ul>

        </div>
    )
}
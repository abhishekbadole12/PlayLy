import styles from "./SideMenu.module.css"
import { CiGrid42 } from "react-icons/ci";
import { BiLogInCircle } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

export default function SideMenu() {

    const currentRoute = '/songs';

    const your_playlist = []

    return (
        <aside className={styles.sideMenu}>
            
            <h2 className={styles.projectTitle}>PLAY LY</h2>

            <ul className={styles.asideItems}>

                <p className={styles.asideItemTitle}>General</p>

                <li className={`${styles.asideItem} ${currentRoute === '/trending-songs' && styles.activeItem}`}>
                    <CiGrid42 />
                    <p>Trending Songs</p>
                </li>

                <li className={`${styles.asideItem} ${currentRoute === '/songs' && styles.activeItem}`}>
                    <CiGrid42 />
                    <p>Songs</p>
                </li>

                <p className={styles.asideItemTitle}>Your Playlist <div className={styles.addPlaylist}><FaPlus className={styles.addIcon}/></div></p>

                {your_playlist.length === 0 ? (
                    <p className={styles.empty}>no playlist</p>
                ) : (
                    <li className={`${styles.asideItem} ${currentRoute === '/trending-songs' && styles.activeItem}`}>
                        <CiGrid42 />
                        <p>favourate</p>
                    </li>
                )}

                {/* Logout */}

                <li className={styles.asideItem}>
                    <BiLogInCircle />
                    <p>Logout</p>
                </li>
            </ul>

        </aside>
    )
}
import { useEffect, useState } from "react"
import styles from "./SideMenu.module.css"
import { CiGrid42 } from "react-icons/ci";
import { BiLogInCircle } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Playlist from "../Playlist/Playlist";
import usePlaylistStore from "../../store/playlistStore";
import useAuthStore from "../../store/authStore";

export default function SideMenu({ }) {

    const { playlists } = usePlaylistStore()
    const { activePlaylist, logout } = useAuthStore()

    const [isNewPlaylist, setIsNewPlaylist] = useState(false);

    const currentRoute = '/songs';

    // Handle Update Playlist
    const handleUpdate = (title) => {

    }

    // Handle Cancel Update
    const handleCancel = (event) => {

    }

    return (
        <aside className={styles.sideMenu}>
            <h2 className={styles.projectTitle}>PLAY LY</h2>

            <ul className={styles.asideItems}>
                <h5 className={styles.asideItemTitle}>General</h5>

                <li className={`${styles.asideItem} ${currentRoute === "/trending-songs" ? styles.activeItem : ""}`}>
                    <CiGrid42 />
                    <p>Trending Songs</p>
                </li>

                <li className={`${styles.asideItem} ${currentRoute === '/songs' ? styles.activeItem : ""}`}>
                    <CiGrid42 />
                    <p>Songs</p>
                </li>

                <h5 className={styles.asideItemTitle}>Your Playlist
                    <div className={styles.addPlaylist}>
                        <FaPlus className={styles.addIcon} onClick={() => setIsNewPlaylist(true)} />
                    </div>
                </h5>

                {playlists.length === 0 ? (
                    <p className={styles.empty}>no playlist</p>
                ) : (
                    playlists.map((playlist) => (
                        <Playlist
                            key={playlist._id}
                            playlist={playlist}
                            onUpdate={handleUpdate}
                            onCancel={handleCancel}
                            // onActive={handleActive}
                            isActive={activePlaylist && activePlaylist._id === playlist._id}
                        />
                    ))
                )}

                {/* New Playlist */}
                {isNewPlaylist && <Playlist />}

                {/* Logout */}
                <li className={styles.asideItem} onClick={() => logout()}>
                    <BiLogInCircle />
                    <p>Logout</p>
                </li>
            </ul>

        </aside >
    )
}
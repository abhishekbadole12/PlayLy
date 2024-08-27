import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import styles from "./SideMenu.module.css";

import Playlist from "../Playlist/Playlist";

// Icons
import { CiGrid42 } from "react-icons/ci";
import { BiLogInCircle } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

// Store
import usePlaylistStore from "../../store/playlistStore";
import useAuthStore from "../../store/authStore";

export default function SideMenu({ }) {
    const navigate = useNavigate();
    const params = useParams()

    const { playlists } = usePlaylistStore()
    const { activePlaylist, logout } = useAuthStore()

    const [isNewPlaylist, setIsNewPlaylist] = useState(false);

    const currentRoute = '/songs';

    const isAside = true;

    // Handle Update Playlist
    const handleUpdate = (title) => {

    }

    // Handle Cancel Update
    const handleCancel = (event) => {

    }

    const handlePlaylistClick = (playlistName) => {
        const path = playlistName.trim().replace(/\s+/g, '-')
        navigate(`/dashboard/${path}`);
    };

    return (
        <aside className={styles.sideMenu}>
            <div style={{ position: 'relative' }}>
                <h2 className={styles.projectTitle}>PLAY LY</h2>

                <div className={`${styles.asideToggle} ${!isAside ? styles.outside : styles.inside}`}>
                    <div />
                </div>
            </div>

            <ul className={styles.asideItems}>
                <h5 className={styles.asideItemTitle}>General</h5>

                <li className={`${styles.asideItem} ${params.playlistName === "trendings" ? styles.activeItem : ""}`}
                    onClick={() => handlePlaylistClick("trendings")}>
                    <CiGrid42 />
                    <p>Trending Songs</p>
                </li>

                <li className={`${styles.asideItem} ${params.playlistName === 'songs' ? styles.activeItem : ""}`}
                    onClick={() => handlePlaylistClick("songs")}>
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
                            onclick={handlePlaylistClick}
                            onUpdate={handleUpdate}
                            onCancel={handleCancel}
                            // onActive={handleActive}
                            isActive={params.playlistName === playlist.title.trim().replace(/\s+/g, '-')}
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
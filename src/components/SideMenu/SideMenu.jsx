import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./SideMenu.module.css";

import Playlist from "../Playlist/Playlist";

// Icons
import { CiGrid42 } from "react-icons/ci";
import { BiLogInCircle } from "react-icons/bi";
import { FaPlus, FaCloudUploadAlt } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { HiTrendingUp } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { FaMusic } from "react-icons/fa";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { MdOutlineCloudUpload } from "react-icons/md";

// Store
import usePlaylistStore from "../../store/playlistStore";
import useAuthStore from "../../store/authStore";
import { showErrorToast, showToast } from "../../utils/showToast";

// hook
import { useIsAdmin } from "../../hooks/isAdmin";
import useSongStore from "../../store/songStore";


export default function SideMenu({ isAside, setIsAside }) {
    const navigate = useNavigate();
    const params = useParams();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("playlist");

    const isAdmin = useIsAdmin()

    const { logout } = useAuthStore();

    const { playlists, createPlaylist, removePlaylist, updatePlaylist } = usePlaylistStore();

    const { getSongs, getTrendingSongs, getPlaylistSongs } = useSongStore()

    const [isNewPlaylist, setIsNewPlaylist] = useState(false);

    // Handle Update Playlist
    const handleUpdate = async (data) => {
        try {
            let isSucceed;
            if (isNewPlaylist) {
                isSucceed = await createPlaylist(data)
                if (isSucceed) showToast('Playlist Created')
            } else {
                isSucceed = await updatePlaylist(data)
                if (isSucceed) showToast('Playlist Title Updated')
            }
        } catch (error) {
            showErrorToast(error.message)
        } finally {
            setIsNewPlaylist(false)
        }
    }

    const handleRemove = async (id) => {
        try {
            const { isSucceed } = await removePlaylist(id)
            if (isSucceed) showToast('Playlist deleted')
        } catch (error) {
            showErrorToast(error.message)
        }
    }

    // Handle Cancel Update
    const handleCancel = () => {
        setIsNewPlaylist(false)
    }

    const handleClick = (playlist) => {
        let path;
        if (typeof playlist === 'object') {
            getPlaylistSongs(playlist._id)
            path = playlist.title.trim().replace(/\s+/g, '-')
            navigate(`/dashboard?playlist=${path}&&id=${playlist._id}`);
        } else if (playlist === 'trendings') {
            path = playlist
            getTrendingSongs()
            navigate(`/dashboard?playlist=${path}`);
        } else if (playlist === 'songs') {
            path = playlist
            getSongs()
            navigate(`/dashboard?playlist=${path}`);

        } else if (playlist === 'upload') {
            path = playlist
            navigate(`/dashboard?song=${path}`);
        }
    };

    const toggleAside = () => {
        setIsAside(!isAside);
    };

    const handleLogout = () => {
        logout(navigate);  // Pass navigate to the store
    };

    const AsideSmallStyle = { marginLeft: 'auto', position: 'absolute', right: '1rem', }

    return (
        <aside className={`${styles.sideMenu} ${!isAside ? styles.hidden : ""}`}>
            <div style={{ position: 'relative' }}>
                {/* Project Title */}
                <h2 className={styles.projectTitle}>PLAY LY
                    {!isAside && <span className={styles.asideSmallProjectTitle}>Pl</span>}
                </h2>

                {/* Aside/SideMenu Toggle */}
                <div className={`${styles.asideToggle} ${!isAside ? styles.outside : styles.inside}`} onClick={toggleAside}>
                    <div />
                </div>
            </div>

            <ul className={styles.asideItems}>
                <h5 className={styles.asideItemTitle}>General
                    {!isAside && <span className={styles.asideItemSmallTitle}>#</span>}
                </h5>

                <li className={`${styles.asideItem} ${query === "trendings" ? styles.activeItem : ""}`}
                    onClick={() => handleClick("trendings")}>
                    <HiTrendingUp className={styles.playlistIcon} />
                    <p className={styles.playlistTitle}>Trending Songs</p>

                    {!isAside && (
                        <div style={AsideSmallStyle}>
                            <HiTrendingUp size={21} />
                        </div>)}
                </li>

                <li className={`${styles.asideItem} ${query === 'songs' ? styles.activeItem : ""}`}
                    onClick={() => handleClick("songs")}>
                    <BsMusicNoteBeamed className={styles.playlistIcon} />
                    <p className={styles.playlistTitle}>Songs</p>

                    {!isAside && (
                        <div style={AsideSmallStyle}>
                            <BiSolidPlaylist size={21} />
                        </div>)}
                </li>

                <h5 className={styles.asideItemTitle}>Your Playlist

                    {!isAside ?
                        <span className={styles.asideItemSmallTitle}>#</span> : (
                            <div className={styles.addPlaylist}>
                                <FaPlus className={styles.addIcon}
                                    onClick={() => setIsNewPlaylist(true)} />
                            </div>
                        )}
                </h5>

                {playlists.length === 0 && !isNewPlaylist ? (
                    <p className={styles.empty}>no playlist</p>
                ) : (
                    playlists.map((playlist) => (
                        <Playlist
                            key={playlist._id}
                            playlist={playlist}
                            onPlaylistClick={handleClick}
                            onCancel={handleCancel}
                            onUpdate={handleUpdate}
                            onDelete={handleRemove}
                            isActive={query == playlist.title.trim().replace(/\s+/g, '-')}
                            isAside={isAside}
                        />
                    ))
                )}

                {/* New Playlist */}
                {isNewPlaylist && isAside &&
                    <Playlist
                        onPlaylistClick={handleClick}
                        onCancel={handleCancel}
                        onUpdate={handleUpdate}
                        isNew={isNewPlaylist}
                        isAside={isAside}
                    />
                }

                {/* Upload Songs - Admin */}
                {isAdmin && (
                    <li className={`${styles.asideItem} ${queryParams.get('song') === "upload" ? styles.activeItem : ""}`}
                        onClick={() => handleClick("upload")}>
                        <FaCloudUploadAlt />
                        <p className={styles.playlistTitle}>Upload Songs</p>

                        {!isAside && (
                            <div className={styles.asideItemSmallItem}>
                                <MdOutlineCloudUpload size={21} />
                            </div>)}
                    </li>
                )}

                {/* Logout */}
                <li className={styles.asideItem} onClick={handleLogout}>
                    <BiLogInCircle />
                    <p className={styles.playlistTitle}>Logout</p>

                    {!isAside && (
                        <div className={styles.asideItemSmallItem}>
                            <IoMdLogOut size={21} />
                        </div>)}
                </li>
            </ul>

        </aside >
    )
}
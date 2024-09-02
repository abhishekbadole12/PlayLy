import { useContext, useState } from 'react';
import styles from './Table.module.css'
import { FaCirclePlay, FaCirclePause, FaDownload } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { formatDuration } from '../../utils/formateDuration';
import usePlaylistStore from '../../store/playlistStore';
import { UserContext } from '../../App';

export default function TableRow({ song, isPlaying, currentSong, onPlay, onAddToPlaylist, inPlaylist }) {

    const { activePlaylist } = useContext(UserContext);

    const { playlists, } = usePlaylistStore();

    const { _id, source, imageUrl, playCount, duration, artist, album, title, firebaseUrl } = song;

    const [isModal, setIsModal] = useState(false);

    const handleAddToPlaylist = async (playlistId) => {
        try {
            await onAddToPlaylist(playlistId, _id)
        } catch (error) {
            console.log(error);
        } finally {
            setIsModal(false)
        }
    }
    console.log(inPlaylist);

    return (
        <tr>
            <td className={styles.songName}>
                <div className={styles.songImage}>
                    <img src={imageUrl} alt="song-image" />
                </div>
                <ul className={styles.songDetails}>
                    <li>
                        <h5 className={styles.songTitle}>
                            {title}
                        </h5>
                    </li>
                    <li>
                        <p className={styles.songArtist}>
                            {artist}
                        </p>
                    </li>
                    <li>
                        <p className={styles.songDuration}>
                            {formatDuration(duration)}
                        </p>
                    </li>
                </ul>
            </td>

            <td>{source}</td>

            <td>{playCount}</td>

            <td className={styles.actionIcons}>

                {currentSong && isPlaying && currentSong._id === _id ?
                    <FaCirclePause className={styles.pauseIcon} onClick={() => onPlay(_id)} />
                    :
                    <FaCirclePlay className={styles.playIcon} onClick={() => onPlay(_id)} />}

                <FaCloudDownloadAlt />



                {inPlaylist ? <IoIosCheckmarkCircle style={{color:'green'}} onClick={() => setIsModal(prev => !prev)}/> : <MdAddCircle onClick={() => setIsModal(prev => !prev)}/>}

                {isModal && playlists.length && (
                    <ul className={styles.playlistItemsModal}>
                        {playlists.map((playlist) => (
                            <li className={styles.playlistItem} key={playlist._id} onClick={() => handleAddToPlaylist(playlist._id)}>
                                {playlist.title}
                            </li>
                        ))}
                    </ul>
                )}
            </td>
        </tr>
    )
}

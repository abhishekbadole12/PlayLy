import { useState } from 'react';
import styles from './Table.module.css'
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

// helper fun
import { formatDuration } from '../../utils/formateDuration';

// Store's
import usePlaylistStore from '../../store/playlistStore';
import useSongStore from '../../store/songStore';

export default function TableRow({ song, isPlaying, currentSong, onPlay, onAddToPlaylist, inPlaylist }) {

    const { playlists, } = usePlaylistStore();
    const { updateDownloadCount } = useSongStore();

    const { _id, source, imageUrl, playCount, downloadCount, duration, artist, title, firebaseUrl } = song;

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

    // Handle Download
    const handleDownload = async (url) => {
        try {
            const response = await updateDownloadCount(_id);
            if (response) {
                window.open(url, '_blank');
            }
        } catch (error) {
            showToast(error.message)
        }
    };

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

            <td>{downloadCount}</td>

            <td className={styles.actionIcons}>

                {currentSong && isPlaying && currentSong._id === _id ?
                    <FaCirclePause className={styles.pauseIcon} onClick={() => onPlay(song)} />
                    :
                    <FaCirclePlay className={styles.playIcon} onClick={() => onPlay(song)} />}

                <FaCloudDownloadAlt onClick={() => handleDownload(firebaseUrl, `${title}.mp3`)} />

                {inPlaylist ?
                    <IoIosCheckmarkCircle style={{ color: 'green' }} onClick={() => setIsModal(prev => !prev)} />
                    : <MdAddCircle onClick={() => setIsModal(prev => !prev)} />}

                {/* Modal */}
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

import styles from './Table.module.css'
import { FaCirclePlay, FaCirclePause, FaDownload } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { MdDownloadForOffline } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";

import { formatDuration } from '../../utils/formateDuration';

export default function TableRow({ song, isPlaying, currentSong, handlePlayIcon }) {

    const { _id, source, imageUrl, playCount, duration, artist, album, title, firebaseUrl } = song;

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
                    <FaCirclePause className={styles.pauseIcon} onClick={() => handlePlayIcon(_id)} />
                    :
                    <FaCirclePlay className={styles.playIcon} onClick={() => handlePlayIcon(_id)} />}

                <FaCloudDownloadAlt />

                <MdAddCircle />
            </td>

        </tr>
    )
}

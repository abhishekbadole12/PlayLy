import styles from './Table.module.css'
import { FaCirclePlay, FaCirclePause, FaDownload } from "react-icons/fa6";
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

            <td className={styles.playPauseButton}>
                {currentSong && isPlaying && currentSong._id === _id ?
                    <FaCirclePause size={35} className={styles.pauseButton} onClick={() => handlePlayIcon(_id)} />
                    :
                    <FaCirclePlay size={35} className={styles.playButton} onClick={() => handlePlayIcon(_id)} />}

                <FaDownload size={25} className={styles.pauseButton} />
            </td>

        </tr>
    )
}

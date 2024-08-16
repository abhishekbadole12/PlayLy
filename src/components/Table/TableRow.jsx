import styles from './Table.module.css'
import songImg from "../../assets/song-img.jpg"
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";

export default function TableRow({ song, currentPlayingSongId, handlePlayIconClick }) {

    const { _id, url, duration, singer, name } = song;

    return (
        <tr>
            <td className={styles.songName}>
                <div className={styles.songImage}>
                    <img src={songImg} alt="song-image" />
                </div>
                <ul className={styles.songDetails}>
                    <li>
                        <h5 className={styles.songTitle}>
                            <span className={styles.songLabel}>Name:</span> <span className={styles.songContent}>{name}</span>
                        </h5>
                    </li>
                    <li>
                        <p className={styles.songArtist}>
                            <span className={styles.songLabel}>Singer:</span> {singer}
                        </p>
                    </li>
                    <li>
                        <p className={styles.songDuration}>
                            <span className={styles.songLabel}>Duration: {duration}</span>
                        </p>
                    </li>
                </ul>
            </td>

            <td>Youtube</td>

            <td>17/06/2021</td>

            <td className={styles.playPauseButton}>
                {currentPlayingSongId === _id ? <FaCirclePause size={40} className={styles.pauseButton} onClick={() => handlePlayIconClick(_id)} />
                    : <FaCirclePlay size={40} className={styles.playButton} onClick={() => handlePlayIconClick(_id)} />}
            </td>

        </tr>
    )
}

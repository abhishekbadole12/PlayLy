import styles from './Table.module.css'
import songImg from "../../assets/song-img.jpg"
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";

export default function TableRow({ song, isPlaying, currentSong, handlePlayIcon }) {

    const { _id, duration, singer, name } = song;

    return (
        <tr>
            <td className={styles.songName}>
                <div className={styles.songImage}>
                    <img src={songImg} alt="song-image" />
                </div>
                <ul className={styles.songDetails}>
                    <li>
                        <h5 className={styles.songTitle}>
                            {name}
                        </h5>
                    </li>
                    <li>
                        <p className={styles.songArtist}>
                            {singer}
                        </p>
                    </li>
                    <li>
                        <p className={styles.songDuration}>
                            {duration}
                        </p>
                    </li>
                </ul>
            </td>

            <td>Youtube</td>

            <td>17/06/2021</td>

            <td className={styles.playPauseButton}>
                {currentSong && isPlaying && currentSong._id === _id ?
                    <FaCirclePause size={40} className={styles.pauseButton} onClick={() => handlePlayIcon(_id)} />
                    :
                    <FaCirclePlay size={40} className={styles.playButton} onClick={() => handlePlayIcon(_id)} />}
            </td>

        </tr>
    )
}

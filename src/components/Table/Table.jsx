import styles from "./Table.module.css"
import songImg from "../../assets/song-img.jpg"
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";

export default function Table({ isSongPlaying }) {

    return (
        <table>
            <thead>
                <th>SONG NAME</th>
                <th>SOURCE</th>
                <th>ADDED ON</th>
                <th>ACTION</th>
            </thead>

            <tbody>

                <tr>
                    <td className={styles.songName}>
                        <div className={styles.songImage}>
                            <img src={songImg} alt="song-image" />
                        </div>
                        <ul className={styles.songDetails}>
                            <li>
                                <h5 className={styles.songTitle}>
                                    <span className={styles.songLabel}>Name:</span> <span className={styles.songContent}>Chaff & Dust</span>
                                </h5>
                            </li>
                            <li>
                                <p className={styles.songArtist}>
                                    <span className={styles.songLabel}>Singer:</span> John Doe
                                </p>
                            </li>
                            <li>
                                <p className={styles.songDuration}>
                                    <span className={styles.songLabel}>Duration: 00:00</span>
                                </p>
                            </li>
                        </ul>
                    </td>

                    <td>Youtube</td>

                    <td>17/06/2021</td>

                    <td className={styles.playPauseButton}>
                        {isSongPlaying ? <FaCirclePause size={40} className={styles.pauseButton} />
                            : <FaCirclePlay size={40} className={styles.playButton} />}
                    </td>

                </tr>

                <tr>

                    <td className={styles.songName}>
                        <div className={styles.songImage}>
                            <img src={songImg} alt="song-image" />
                        </div>
                        <ul className={styles.songDetails}>
                            <li>
                                <h5 className={styles.songTitle}>
                                    <span className={styles.songLabel}>Name:</span> <span className={styles.songContent}>Chaff & Dust</span>
                                </h5>
                            </li>
                            <li>
                                <p className={styles.songArtist}>
                                    <span className={styles.songLabel}>Singer:</span> John Doe
                                </p>
                            </li>
                            <li>
                                <p className={styles.songDuration}>
                                    <span className={styles.songLabel}>Duration: 00:00</span>
                                </p>
                            </li>
                        </ul>
                    </td>

                    <td>Youtube</td>

                    <td>17/06/2021</td>
                    <td className={styles.playPauseButton}>
                        {isSongPlaying ? <FaCirclePause size={40} className={styles.pauseButton} />
                            : <FaCirclePlay size={40} className={styles.playButton} />}
                    </td>

                </tr>

            </tbody>

        </table>
    )
}

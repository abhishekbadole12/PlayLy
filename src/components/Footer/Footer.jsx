import { useState } from "react";
import songImg from "../../assets/song-img.jpg"
import styles from "./Footer.module.css"
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { AiOutlinePause } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { Howl, Howler } from 'howler';

export default function Footer() {
    const url = `https://assets.mixkit.co/music/preview/mixkit-house-fest-113.mp3`

    const [sound, setSound] = useState(null);

    const isSongPlaying = false;

    const playAudio = () => {
        // function
    }

    return (
        <footer>

            {/* Progress bar */}
            <div className={styles.progressBarContainer}>

                <div className={styles.progressBar}>
                    <div className={styles.backGrey} />
                    <div className={styles.steps} style={{ width: `${50}%` }} />
                </div>

            </div>

            {/* Song Menu */}

            <div className={styles.footerBottom}>

                <div className={styles.songName}>
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
                </div>

                <div className={styles.playLogicButtonContainer}>
                    <MdOutlineSkipPrevious className={styles.playLogicButton} />

                    {isSongPlaying ? <AiOutlinePause className={styles.playLogicButton} onClick={playAudio} />
                        : <BsPlayFill className={styles.playLogicButton} onClick={playAudio} />}

                    <MdOutlineSkipNext className={styles.playLogicButton} />
                </div>
            </div>

        </footer>

    )
}

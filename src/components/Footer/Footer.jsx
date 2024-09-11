import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player'
import songImg from "../../assets/song-img.jpg"
import styles from "./Footer.module.css"
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { AiOutlinePause } from "react-icons/ai";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";

import { BsPlayFill } from "react-icons/bs";
import { Howl, Howler } from 'howler';
import { UserContext } from "../../App";
import { formatDuration } from "../../utils/formateDuration";
import { VscMute, VscUnmute } from "react-icons/vsc";
import useSongStore from "../../store/songStore";
import { IoCloseCircle } from "react-icons/io5";
import { MoonLoader } from "react-spinners";

export default function Footer({ isAside }) {

    const { currentSong, setCurrentSong, setMediaPlayer, isPlaying, setIsPlaying } = useContext(UserContext);
    const { songs } = useSongStore()

    const [currentSongIndex, setCurrentSongIndex] = useState(null);

    const [progress, setProgress] = useState({ playedSeconds: 0, played: 0, loadedSeconds: 0, loaded: 0 });
    const [player, setPlayer] = useState(null);
    const [volume, setVolume] = useState(localStorage.getItem('volumn') || 0);

    // Set the current song index when currentSong is set
    useEffect(() => {
        if (currentSong) {
            const index = songs.findIndex(song => song._id === currentSong._id);
            setCurrentSongIndex(index);
            setProgress({ playedSeconds: 0, played: 0, loadedSeconds: 0, loaded: 0 })
        }
    }, [currentSong, songs]);

    useEffect(() => {
        if (player) {
            player.seekTo(progress.played);
        }
    }, [progress.played, player]);

    const handlePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    // Handle "Next" button click
    const handleNext = () => {
        if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
            const nextSong = songs[currentSongIndex + 1];
            setProgress({ playedSeconds: 0, played: 0, loadedSeconds: 0, loaded: 0 })
            setCurrentSong(nextSong);  // Update currentSong with next song
        }
    };

    // Handle "Previous" button click
    const handlePrevious = () => {
        if (currentSongIndex !== null && currentSongIndex > 0) {
            const previousSong = songs[currentSongIndex - 1];
            setProgress({ playedSeconds: 0, played: 0, loadedSeconds: 0, loaded: 0 })
            setCurrentSong(previousSong);  // Update currentSong with previous song
        }
    };

    const handleProgress = (progress) => {
        setProgress(progress)
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        localStorage.setItem('volumn', newVolume)
        setVolume(newVolume);
    }

    const handleClosePlayer = () => {
        setIsPlaying(false);
        setMediaPlayer(false);
        setCurrentSong(null);
    }

    const handleEnded = () => {
        handleNext();
    };

    return (
        <footer style={{ width: isAside ? '79.5%' : '93%' }}>

            {/* Progress bar */}
            <div className={styles.progressBarContainer}>

                <div className={styles.progressBar}>
                    {/* Full song background */}
                    <div className={styles.backGrey} />

                    {/* Loaded part (loadedSeconds) */}
                    <div
                        className={styles.loaded}
                        style={{
                            width: `${(progress.loaded / 1) * 100}%`,
                        }}
                    />

                    {/* Played part (playedSeconds) */}
                    <div
                        className={styles.played}
                        style={{
                            width: `${(progress.played / 1) * 100}%`,
                        }}
                    />
                </div>
            </div>

            {/* Song Menu */}
            <div className={styles.footerBottom}>

                {/* Song Album Img */}
                <div className={styles.songName}>
                    <div className={styles.songImage}>
                        <img src={currentSong?.imageUrl || songImg} alt="song-image" />
                    </div>
                    <ul className={styles.songDetails}>
                        <li>
                            <h5 className={styles.songTitle}>
                                <span className={styles.songLabel}>Name:</span> <span className={styles.songContent}>{currentSong?.title}</span>
                            </h5>
                        </li>
                        <li>
                            <p className={styles.songArtist}>
                                <span className={styles.songLabel}>Artist:</span> {currentSong?.artist}
                            </p>
                        </li>
                        <li>
                            <p className={styles.songDuration}>
                                <span className={styles.songLabel}>Duration: {formatDuration(currentSong?.duration)} | Remaning: {formatDuration(currentSong?.duration - progress.playedSeconds)}</span>
                            </p>
                        </li>
                    </ul>
                </div>

                <div className={styles.playLogicButtonContainer}>
                    <MdOutlineSkipPrevious className={styles.playLogicButton} onClick={handlePrevious} />

                    <ReactPlayer
                        url={currentSong?.firebaseUrl}
                        playing={isPlaying}
                        onProgress={handleProgress}
                        onEnded={handleEnded}
                        ref={setPlayer}
                        width="0"
                        height="0"
                        style={{ display: 'none' }}
                        volume={volume / 100}
                        muted={volume === 0}
                    />

                    <div className={styles.mainBtn}>

                        {currentSong !== null && isPlaying ? (
                            <FaCirclePause className={`${styles.playLogicButton} ${styles.pauseIcon}`} onClick={handlePlayPause} />
                        ) : (
                            <FaCirclePlay className={`${styles.playLogicButton} ${styles.playIcon}`} onClick={handlePlayPause} />
                        )}

                        {/* <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '47%',
                            transform: 'translate(-50%, -50%)',
                        }}>
                            <MoonLoader size={47} />
                        </div> */}
                    </div>


                    <MdOutlineSkipNext className={styles.playLogicButton} onClick={handleNext} />
                </div>

                {/* Volume Container */}
                <div className={styles.volumeContainer}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className={styles.volumeSlider}
                    />

                    <span className={styles.volumeTag}>{volume}%</span>

                    {volume === 0 ?
                        <VscMute className={styles.muteIcon} onClick={() => setVolume(50)} />
                        :
                        <VscUnmute className={styles.muteIcon} onClick={() => setVolume(0)} />
                    }
                </div>
            </div>

            <IoCloseCircle className={styles.closeFooterIcon} onClick={handleClosePlayer} />

        </footer>

    )
}

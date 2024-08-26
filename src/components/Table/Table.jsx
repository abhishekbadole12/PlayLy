import { useContext, useEffect } from "react";
import styles from "./Table.module.css"
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { UserContext } from "../../App"

import useSongStore from "../../store/songStore";

export default function Table({ isPlaying, setIsPlaying }) {

    const { currentSong, setCurrentSong } = useContext(UserContext);

    const { songs } = useSongStore();

    // handle table play button
    const handlePlayIcon = (id) => {
        const addSong = songs.length > 0 && songs.find((song) => song._id === id)
        setIsPlaying(prev => currentSong && currentSong._id === id ? !prev : true)
        setCurrentSong(addSong)
    };

    return (
        <table className={styles.table}>
            <TableHead />

            <tbody className={styles.tbody}>

                {songs.length ?
                    songs.map((song) => (
                        <TableRow key={song._id}
                            song={song}
                            isPlaying={isPlaying}
                            currentSong={currentSong}
                            handlePlayIcon={handlePlayIcon} />
                    )) :
                    <tr><td style={{ textAlign: 'center' }}>No data available</td></tr>
                }

            </tbody>
        </table>
    )
}

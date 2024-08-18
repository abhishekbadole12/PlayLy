import { useContext } from "react";
import styles from "./Table.module.css"
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { UserContext } from "../../App"

export default function Table({ songs, isPlaying, setIsPlaying }) {

    const { currentSong, setCurrentSong } = useContext(UserContext);

    // handle table play button
    const handlePlayIcon = (id) => {
        const addSong = songs.find((song) => song._id === id)
        setIsPlaying(prev => currentSong && currentSong._id === id ? !prev : true)
        setCurrentSong(addSong)
    };

    return (
        <table className={styles.table}>
            <TableHead />

            <tbody className={styles.tbody}>

                {songs.length > 0 ?
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

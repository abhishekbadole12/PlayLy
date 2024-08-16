import styles from "./Table.module.css"
import TableRow from "./TableRow";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App"

export default function Table({ songs }) {

    const { currentPlayingSongId, setCurrentPlayingSongId } = useContext(UserContext);

    const handlePlayIconClick = (id) => {
        const currentSongId = localStorage.getItem('currentSongId');
    
        if (currentSongId === id) {
            localStorage.removeItem('currentSongId');
            setCurrentPlayingSongId(null);
        } else {
            localStorage.setItem('currentSongId', id);
            setCurrentPlayingSongId(id);
        }
    };
  
    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    <th>SONG NAME</th>
                    <th>SOURCE</th>
                    <th>ADDED ON</th>
                    <th>ACTION</th>
                </tr>
            </thead>

            <tbody className={styles.tbody}>
                {songs.map((song) => (
                    <TableRow key={song._id} song={song} currentPlayingSongId={currentPlayingSongId} handlePlayIconClick={handlePlayIconClick} />
                ))}
            </tbody>
        </table>
    )
}

import styles from "./Dashboard.module.css"
import SideMenu from "../../components/SideMenu/SideMenu";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import { useContext, useEffect, useState } from "react";
import { getSongs } from "../../services/api";
import { UserContext } from "../../App";

export default function Dashboard() {

    const { currentPlayingSongId, setCurrentPlayingSongId } = useContext(UserContext)

    const [songs, setSongs] = useState([]) // Songs List

    useEffect(() => {
        const fetchSongs = async () => {
            const res = await getSongs()
            setSongs(res)

            // Check if currentPlayingSongId and localStorage are empty, and if so, set the first song
            if (!currentPlayingSongId && !localStorage.getItem('currentSongId') && res.length > 0) {
                setCurrentPlayingSongId(res[0]._id);
                localStorage.setItem('currentSongId', res[0]._id);
            }
        }

        fetchSongs()
    }, [])

    return (
        <div className={styles.Dashboard}>

            <SideMenu />

            <section>

                <Header />

                <Table songs={songs} />

                <Footer currentPlayingSong={songs.find((song) => (song._id === currentPlayingSongId))} />

            </section>

        </div >)
}


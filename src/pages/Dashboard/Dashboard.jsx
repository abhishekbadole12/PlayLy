import styles from "./Dashboard.module.css"
import SideMenu from "../../components/SideMenu/SideMenu";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import { useContext, useEffect, useState } from "react";
import { getSongs } from "../../services/api";
import { UserContext } from "../../App";

export default function Dashboard() {

    const { currentSong, setCurrentSong } = useContext(UserContext)

    const [isPlaying, setIsPlaying] = useState(false);
    const [songs, setSongs] = useState([]) // Songs List

    const handlePrev = () => {
        // handle previous
    }

    const handleNext = () => {
        // handle next
    }

    useEffect(() => {
        const fetchSongs = async () => {
            const res = await getSongs()
            setSongs(res)
        }
        fetchSongs()
    }, [])

    return (
        <div className={styles.Dashboard}>

            <SideMenu />

            <section>
                <Header />

                <Table songs={songs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

                <Footer isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}
                    handlePrev={handlePrev} handleNext={handleNext} />
            </section>
        </div >)
}


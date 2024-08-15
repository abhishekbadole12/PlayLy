import styles from "./Dashboard.module.css"
import SideMenu from "../../components/SideMenu/SideMenu";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";

export default function Dashboard() {

    const isSongPlaying = false;

    return (
        <div className={styles.Dashboard}>

            <SideMenu />

            <section>

                <Header />

                <Table isSongPlaying={isSongPlaying}/>

                <Footer />

            </section>

        </div >)
}


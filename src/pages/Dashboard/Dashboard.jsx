import styles from "./Dashboard.module.css"
import SideMenu from "../../components/SideMenu/SideMenu";
import Footer from "../../components/Footer/Footer";

export default function Dashboard() {

    return (
        <div className={styles.Dashboard}>

            <SideMenu />

            <section>


                <Footer />

            </section>

        </div >)
}


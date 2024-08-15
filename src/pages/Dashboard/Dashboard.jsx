import styles from "./Dashboard.module.css"
import SideMenu from "../../components/SideMenu/SideMenu";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Dashboard() {

    return (
        <div className={styles.Dashboard}>

            <SideMenu />

            <section>
                
                <Header />

                <Footer />

            </section>

        </div >)
}


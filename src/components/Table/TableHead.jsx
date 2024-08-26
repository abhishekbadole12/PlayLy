import styles from './Table.module.css'


export default function TableHead() {
    return (
        <thead className={styles.thead}>
            <tr>
                <th>SONG NAME</th>
                <th>SOURCE</th>
                <th>Count</th>
                <th>ACTION</th>
            </tr>
        </thead>
    )
}

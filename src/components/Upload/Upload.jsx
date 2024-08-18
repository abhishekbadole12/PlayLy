import React, { useState } from 'react';
import styles from './Upload.module.css'

export default function Upload() {
    const [formData, setFormData] = useState({
        songName: '',
        source: '',
        file: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className={styles.uploadContainer}>
            <h4 className={styles.title}>Upload Songs</h4>

            <form className={styles.uploadForm} onSubmit={handleSubmit}>
                <label className={styles.formLabel}>
                    <span>Song Name:</span>
                    <input type="text" className={styles.inputField} placeholder="Enter song name" onChange={handleChange} name='songName' />
                </label>

                <label className={styles.formLabel}>
                    <span>Source:</span>
                    <input type="text" className={styles.inputField} placeholder="Enter source" onChange={handleChange} name='source' />
                </label>

                <label className={styles.formLabel}>
                    <span>Upload File:</span>
                    <input type="file" className={styles.fileInput} name='file' onChange={handleChange} />
                </label>

                <button type="submit" className={styles.submitButton}>{isLoading ? 'Loading...' : 'Upload'}</button>
            </form>
        </div >
    )
}

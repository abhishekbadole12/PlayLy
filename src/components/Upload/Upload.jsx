import React, { useState } from 'react';
import styles from './Upload.module.css'
import useSongStore from '../../store/songStore';
import { showErrorToast, showToast } from '../../utils/showToast';

export default function Upload() {
    const { isUploading, uploadSong } = useSongStore();

    const [formData, setFormData] = useState({ source: '', files: [], });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData((prev) => ({
                ...prev, [name]: Array.from(files)
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isSucceed = await uploadSong(formData)
            if (isSucceed) {
                showToast('Uploaded Successfully')
                setFormData({ source: '', files: [] });
            }
        } catch (error) {
            showErrorToast(error.message)
            setFormData({ source: '', files: [] });
        }
    };

    return (
        <div className={styles.uploadContainer}>
            <h4 className={styles.title}>Upload Songs</h4>

            <form className={styles.uploadForm} onSubmit={handleSubmit}>
                <label className={styles.formLabel}>
                    <span>Source:</span>
                    <input type="text" className={styles.inputField} placeholder="Enter source" onChange={handleChange} name='source' />
                </label>

                <label className={styles.formLabel}>
                    <span>Upload File:</span>
                    <input type="file" className={styles.fileInput} name='files' onChange={handleChange} multiple />
                </label>

                <button type="submit" disabled={isUploading} className={styles.submitButton}>{isUploading ? 'Uploading...' : 'Upload'}</button>
            </form>
        </div >
    )
}

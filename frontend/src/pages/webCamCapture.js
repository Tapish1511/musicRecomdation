import React from 'react'
import styles from '../css/main.module.css'
import Webcam from 'react-webcam';

const videoConstraints = {
width: 1280,
height: 720,
facingMode: "user"
};

const WebcamCapture = ({setImgSrc}) => (
<Webcam
// height = 720, width = 1280
    className={styles.camera}
    audio={false}
    screenshotFormat="image/jpeg"
    videoConstraints={videoConstraints}
>
    {({ getScreenshot }) => (
    <button
        className={styles.searchBtn}
        onClick={()=>{
            const imgSrc = getScreenshot()
            setImgSrc(imgSrc);
        }}
    >
        Search for music
    </button>
    )}
</Webcam>
);

export default WebcamCapture;
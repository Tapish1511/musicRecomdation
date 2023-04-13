import React, {useState, useEffect, useRef} from 'react'
import styles from './css/main.module.css'
import WebcamCapture from './pages/webCamCapture';
import FeatureList from './pages/feature';
import * as faceapi from 'face-api.js';
import RighDivContent from './pages/songList';

const selectSongContext = React.createContext();



function HomePage(){

    const [imgSrc, setImgSrc] = useState(null);
    const imgRef = useRef();
    const [detection, setDetection] = useState(null);
    const [exp, setExp] = useState("");
    const [age, setAge] = useState("");
    const [gen, setGen] = useState("");
    const rightDivRef = useRef();
    const [songList, setSongList] = useState([]);
    const [status, setStatus] = useState();
    const selectSong = useRef();


    async function handleImage(){
        const detection = await faceapi
        .detectSingleFace(imgRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

        let temp = JSON.stringify(detection)
        if(temp != null || temp != undefined){
            setDetection(JSON.parse(temp));
        }
        else{
            setDetection(detection);
            return null;
        }
        let max = 0;
        let expre = null
        for (let exper in detection.expressions){
            if(detection.expressions[exper] > max) {
                max = detection.expressions[exper];
                expre = exper;
            }
        }
        setExp(expre);
        setAge(detection.age.toFixed(0))
        setGen(detection.gender)
        
    }

    useEffect(()=>{
        const loadModules = ()=>{
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
                faceapi.nets.ageGenderNet.loadFromUri("/models")

            ]).then(()=>{
                handleImage();
            }).catch((e)=>{
                console.log(e);
            })
        }

        if(imgSrc !== null){
            loadModules();
        }


    }, [imgSrc]);

    async function getSongs(exp){

        const bodyReq = {tag: exp};
        try{
            const response = await fetch('/searchSong', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyReq)
            });

            if(response.status < 300){
                const songData = await response.json();
                if(songData.length !== 0){
                    console.log("hello");
                    setSongList(songData);
                    setStatus(response.status);
                    console.log(songList);
                }
            }

            

        }catch(e){
            console.error(e);
        }
        
    }

    useEffect(()=>{
        getSongs(exp);
    }, [exp])




    // useEffect(()=>{

    //     window.addEventListener('resize', ()=>{
    //         if(window.innerWidth.toFixed(0) > 550){
    //             rightDivRef.current.style.height='100vh'
    //         }
    //     })
        
    // },[])

    return(<selectSongContext.Provider value={selectSong}>
    <div className={styles.container}>
        <div className={styles.leftDiv}>
            <div className={styles.cameraDiv}>
                <WebcamCapture setImgSrc={setImgSrc} exp={exp}></WebcamCapture>
                <FeatureList exp={exp} detections={detection} age={age} gen={gen}/>
            </div>
            <audio src='' controls autoPlay ref={selectSong}></audio>
        </div>
        <div className={styles.rightDiv} ref={rightDivRef}>
            <RighDivContent expr={exp} data={songList} status={status}/>
        </div>
        <img src={imgSrc} ref={imgRef} alt="" className={styles.hiddenImage}/>

    </div>
    </selectSongContext.Provider>);
}

export {selectSongContext}
export default HomePage;
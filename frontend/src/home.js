import React, {useState, useEffect, useRef} from 'react'
import styles from './css/main.module.css'
import WebcamCapture from './pages/webCamCapture';
import FeatureList from './pages/feature';
import * as faceapi from 'face-api.js'

function HomePage(){

    const [imgSrc, setImgSrc] = useState(null);
    const imgRef = useRef();
    const [detection, setDetection] = useState(null);
    const [exp, setExp] = useState("");
    const [age, setAge] = useState("");
    const [gen, setGen] = useState("");


    async function handleImage(){
        const detection = await faceapi
        .detectSingleFace(imgRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        let temp = JSON.stringify(detection)
        setDetection(JSON.parse(temp));
        
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
        console.log(detection);
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(expre);
            },1000)
        })
        

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


    }, [imgSrc])

    return(<>
    <div className={styles.container}>

        <div className={styles.leftDiv}>
            <div className={styles.cameraDiv}>
                <WebcamCapture setImgSrc={setImgSrc} ></WebcamCapture>
                <FeatureList exp={exp} detections={detection} age={age} gen={gen}/>
            </div>
        </div>
        <div className={styles.rightDiv}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci quisquam, corporis provident quibusdam cumque, officiis quam quis perferendis rerum explicabo deleniti pariatur architecto illo ex, labore aut? Minus, laborum?
        </div>
        <img src={imgSrc} ref={imgRef} alt="" className={styles.hiddenImage}/>
    </div>
    </>);
}


export default HomePage;
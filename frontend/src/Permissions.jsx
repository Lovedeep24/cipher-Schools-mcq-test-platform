import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MediaStreamContext } from "./Context/MediaStreamContext";
import styles from "./styles/Permissions.module.css";

const Permissions = () => {
  const { stream, setStream } = useContext(MediaStreamContext);
  const [error, setError] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const startTest = async () => {
    try {
      console.log("Requesting camera and microphone access...");

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      console.log("Stream obtained:", mediaStream);

      setStream(mediaStream);
      setIsPreviewVisible(true);
      setError('');
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setIsPreviewVisible(false);
      setError('Permission denied or no media devices found. Please allow access to your camera and microphone.');
    }
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      console.log("Assigning stream to video element...");
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().catch(err => {
          console.error("Error starting video playback:", err);
        });
      };
    }
  }, [stream]);

  const proceedToTest = () => {
    if (stream) {
      navigate('/test');
    } else {
      setError('Please allow camera and microphone access before proceeding.');
    }
  };

  return (
    <div className={styles.testEnvironment}>
      {!isPreviewVisible && (
        <div>
          <div className={styles.infoMessage}>
            The test is about to start. Please ensure your camera and microphone are working properly. Click the button below to begin.
          </div>
          <button onClick={startTest}>Start Test</button>
        </div>
      )}

      {isPreviewVisible && (
        <div className={styles.previewContainer}>
          <video ref={videoRef} autoPlay muted style={{ width: '100%', height: 'auto' }} />
          <button onClick={proceedToTest} className={styles.proceedButton}>
            Proceed to Test
          </button>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage} style={{ color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Permissions;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles/Permissions.module.css";

const Permissions = () => {
  const [error, setError] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [stream, setStream] = useState(null);
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
      setIsPreviewVisible(true); // Ensure video element is rendered
      setError(''); // Clear any previous error messages
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
    navigate('/test');
  };

  return (
    <div className={styles.testEnvironment}>
      {!isPreviewVisible && (
        <button onClick={startTest}>Start Test</button>
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

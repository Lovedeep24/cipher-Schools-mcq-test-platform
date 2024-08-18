import React, { useState, useRef } from 'react';
import styles from "./styles/Permissions.module.css";

const Permissions = () => {
  const [error, setError] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const videoRef = useRef(null);

  const startTest = async () => {
    try {
      console.log("Requesting camera and microphone access...");

      // Request camera and microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      console.log("Stream obtained:", stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(err => {
            console.error("Error starting video playback:", err);
          });
        };
      }

      setIsPreviewVisible(true);
      setError(''); // Clear any previous error messages
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setIsPreviewVisible(false);
      setError('Permission denied or no media devices found. Please allow access to your camera and microphone.');
    }
  };

  return (
    <div className={styles.testEnvironment}>
      <button onClick={startTest}>Start Test</button>
      
      {isPreviewVisible && (
        <div className={styles.previewContainer}>
          <video ref={videoRef} autoPlay muted style={{ width: '100%', height: 'auto' }} />
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

import React, { useEffect, useState } from 'react'
import styles from "./Styles/TestCluster.module.css";
import { useNavigate } from 'react-router-dom';
// const[testName,setTestName]=useState("");
// const[testDescription,setTestDescription]=useState("");
// const[createdOn,setCreatedOn]=useState("");

function TestCluster() {
  const[tests,setTests]=useState([]);
  const Navigate = useNavigate();
  const fetchtests=async()=>{
    const response=await fetch('http://localhost:9000/tests');
    const data=await response.json();
    if(data.data)
    {
      setTests(data.data);
      console.log(data.data);
    }
    else
    {
      console.error("Error fetching tests");
    }
  }
  useEffect(()=>
    { 
    fetchtests()
  },[]);
  
  const handleTestClick=(testId)=>{
    Navigate(`/test/${testId}`);
  }
  return (
    <>
    <div className={styles.mainCluster}>
      <h1>Test Cluster</h1>
      {/* <button onClick={fetchtests}>Show Tests</button> */}
        <div className={styles.tests}>
          {tests.length===0 ? (<p>No tests available</p>) 
          : (tests.map((test)=>{
            return <div key={test._id} className={styles.test} onClick={() => handleTestClick(test._id)}>
                <h2>{test.testName}</h2>
                <p>{test.description}</p>
                <p>Created on: {new Date(test.createdAt).toLocaleString()}</p>
            </div>
          }))}
    </div>
    </div>
    </>
  );
}

export default TestCluster
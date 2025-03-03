import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const featureNames = [
    "ANDROID_OS_BINDER", "SEND_SMS", "READ_PHONE_STATE", "READ_SMS", "WRITE_SMS",
    "ACCESS_LOCATION_EXTRA_COMMANDS", "ACCESS_NETWORK_STATE", "ACCESS_COARSE_LOCATION",
    "ACCESS_WIFI_STATE", "WRITE_EXTERNAL_STORAGE", "ACCESS_FINE_LOCATION"
];

function App() {
    const [features, setFeatures] = useState(Array(featureNames.length).fill(0));
    const [result, setResult] = useState("");

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", {
                features
            });
            setResult(response.data.prediction);
        } catch (error) {
            console.error("Error:", error);
            setResult("Error in prediction.");
        }
    };

    return (
        <div className="container">
            <h1>Malware Detection</h1>
            <div className="feature-list">
                {featureNames.map((feature, index) => (
                    <div key={index} className="feature-item">
                        <label>{feature}</label>
                        <input type="radio" name={feature} onClick={() => handleFeatureChange(index, 1)} /> Yes
                        <input type="radio" name={feature} onClick={() => handleFeatureChange(index, 0)} /> No
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Predict</button>
            {result && <h2>Prediction: {result}</h2>}
        </div>
    );
}

export default App;

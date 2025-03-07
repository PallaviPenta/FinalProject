import sys
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from MalwareDetection import predict_malware  # Ensure correct import

# Ensure the backend directory is in Python's path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Get JSON input from frontend

        # Ensure data contains the 'features' key and is a list
        if not isinstance(data, dict) or "features" not in data or not isinstance(data["features"], list):
            return jsonify({"error": "Expected 'features' key with a list of binary values (0 or 1)."}), 400

        # Ensure all feature values are either 0 or 1
        if not all(value in [0, 1] for value in data["features"]):
            return jsonify({"error": "Feature values must be only 0 or 1."}), 400

        # Call the prediction function with valid input
        result = predict_malware(data["features"])
        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS  
from joblib import load
import pandas as pd
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and label encoder
try:
    model = load('carbon-model-predictor.pkl')  # Ensure filename matches your saved model
    le = load('label-encoder.pkl')  # Ensure filename matches your saved encoder
except Exception as e:
    print("Error loading model or encoder:", str(e))
    traceback.print_exc()
    model, le = None, None  # Prevent crashes if loading fails

@app.route('/api/predict-carbon-points', methods=['POST'])
def predict_carbon_points():
    try:
        # Ensure model and encoder are loaded
        if model is None or le is None:
            return jsonify({"error": "Model or encoder not loaded properly"}), 500

        # Extract JSON data from request
        data = request.get_json()
        print("Received data:", data)  # Debugging

        # Extract and validate the required fields
        farm_size = data.get('farmSize')
        crop_name = data.get('cropName')
        n_value = data.get('nValue')
        p_value = data.get('pValue')
        k_value = data.get('kValue')
        crop_lifespan = data.get('cropLifespan')

        # Ensure no None values
        if any(val is None for val in [farm_size, crop_name, n_value, p_value, k_value, crop_lifespan]):
            return jsonify({"error": "Invalid input data. Ensure all fields are provided."}), 400

        # Convert types safely
        try:
            farm_size = float(farm_size)
            n_value = float(n_value)
            p_value = float(p_value)
            k_value = float(k_value)
            crop_lifespan = int(crop_lifespan)
        except ValueError:
            return jsonify({"error": "Invalid input format. Numbers required for farmSize, N, P, K, and cropLifespan."}), 400

        # Validate crop name
        if crop_name not in le.classes_:
            return jsonify({"error": f"Crop '{crop_name}' not recognized"}), 400

        # Encode the crop name
        crop_name_encoded = le.transform([crop_name])[0]

        # Prepare input data for prediction
        input_data = pd.DataFrame([[farm_size, crop_name_encoded, n_value, p_value, k_value, crop_lifespan]],
                                  columns=["Farm Size (acres)", "Crop Name", "N Value", "P Value", "K Value", "Crop Lifespan (months)"])

        # Predict carbon points
        predicted_carbon_points = model.predict(input_data)
        carbon_points_rounded = round(float(predicted_carbon_points[0]), 2)

        return jsonify({"carbonPoints": carbon_points_rounded})
    
    except Exception as e:
        print("Error during prediction:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

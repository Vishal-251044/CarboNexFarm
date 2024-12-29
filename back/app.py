from flask import Flask, request, jsonify
from flask_cors import CORS  
from joblib import load
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and label encoder
model = load('carbon_prediction_model.pkl')
le = load('label_encoder.pkl')

@app.route('/api/predict-carbon-points', methods=['POST'])
def predict_carbon_points():
    try:
        # Extract JSON data from request
        data = request.get_json()

        # Extract and validate the required fields
        farm_size = float(data.get('farmSize'))
        crop_name = data.get('cropName')
        n_value = float(data.get('nValue'))
        p_value = float(data.get('pValue'))
        k_value = float(data.get('kValue'))
        crop_lifespan = int(data.get('cropLifespan'))

        if not all([farm_size, crop_name, n_value, p_value, k_value, crop_lifespan]):
            return jsonify({"error": "Invalid input data"}), 400

        # Encode the crop name
        crop_name_encoded = le.transform([crop_name])[0]

        # Prepare input data for prediction
        input_data = pd.DataFrame([[farm_size, crop_name_encoded, n_value, p_value, k_value, crop_lifespan]],
                                  columns=["Farm Size (acres)", "Crop Name", "N Value", "P Value", "K Value", "Crop Lifespan (months)"])

        # Predict carbon points
        predicted_carbon_points = model.predict(input_data)

        # Round the predicted carbon points to 2 decimal places
        carbon_points_rounded = round(predicted_carbon_points[0], 2)

        return jsonify({"carbonPoints": carbon_points_rounded})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

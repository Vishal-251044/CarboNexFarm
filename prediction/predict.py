import joblib
import pandas as pd

# Load trained model and label encoder
model = joblib.load("carbon-model-predictor.pkl")
le = joblib.load("label-encoder.pkl")

def predict_carbon_points(farm_size, crop_name, n_value, p_value, k_value, crop_lifespan):
    try:
        # Encode crop name
        if crop_name not in le.classes_:
            return {"error": f"Crop '{crop_name}' not recognized"}
        crop_encoded = le.transform([crop_name])[0]

        # Prepare input data
        input_data = pd.DataFrame([[farm_size, crop_encoded, n_value, p_value, k_value, crop_lifespan]],
                                  columns=["Farm Size (acres)", "Crop Name", "N Value", "P Value", "K Value", "Crop Lifespan (months)"])

        # Predict
        prediction = model.predict(input_data)[0]
        return {"carbonPoints": round(prediction, 2)}

    except Exception as e:
        return {"error": str(e)}

# Example usage
if __name__ == "__main__":
    result = predict_carbon_points(50, "Rice", 100, 30, 70, 6)
    print(result)

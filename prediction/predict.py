import pandas as pd
import joblib

# Load the saved model and label encoder
model = joblib.load('carbon_prediction_model.pkl')
le = joblib.load('label_encoder.pkl')

# Function to get user input and predict carbon points
def predict_carbon_points():
    print("Enter the following details:")
    
    farm_size = float(input("Farm Size (acres): "))
    crop_name = input("Crop Name: ")
    n_value = float(input("N Value: "))
    p_value = float(input("P Value: "))
    k_value = float(input("K Value: "))
    crop_lifespan = int(input("Crop Lifespan (months): "))
    
    # Encode crop name
    crop_name_encoded = le.transform([crop_name])[0]  # Transform to numeric value

    # Prepare input data for prediction
    input_data = pd.DataFrame([[farm_size, crop_name_encoded, n_value, p_value, k_value, crop_lifespan]],
                              columns=["Farm Size (acres)", "Crop Name", "N Value", "P Value", "K Value", "Crop Lifespan (months)"])
    
    # Predicting carbon points
    predicted_carbon_points = model.predict(input_data)
    
    print(f"Predicted Carbon Points: {predicted_carbon_points[0]:.2f}")

# Run the prediction function
predict_carbon_points()

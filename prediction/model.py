import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

# Load dataset
file_path = "updated_carbon_credit_english_crops.xlsx"
df = pd.read_excel(file_path, sheet_name="Sheet1")

# Encode Crop Name
le = LabelEncoder()
df["Crop Name"] = le.fit_transform(df["Crop Name"])

# Define features and target
X = df.drop(columns=["Carbon Points"])
y = df["Carbon Points"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and encoder
joblib.dump(model, "carbon-model-predictor.pkl")
joblib.dump(le, "label-encoder.pkl")

print("Model training complete. Files saved.")

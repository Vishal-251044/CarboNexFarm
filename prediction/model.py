import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib

# Step 1: Load the dataset from Excel
file_path = 'updated_carbon_credit_english_crops.xlsx'  # Path to your Excel file
df = pd.read_excel(file_path)

# Step 2: Preprocess the data
# Encoding the 'Crop Name' categorical variable
le = LabelEncoder()
df['Crop Name'] = le.fit_transform(df['Crop Name'])

# Features and target variable
X = df.drop("Carbon Points", axis=1)
y = df["Carbon Points"]

# Step 3: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Train the model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Step 5: Save the model and label encoder
joblib.dump(model, 'carbon_prediction_model.pkl')
joblib.dump(le, 'label_encoder.pkl')

print("Model trained and saved successfully.")

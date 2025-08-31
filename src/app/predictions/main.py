import joblib
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS  # <--- important for frontend

# Load model and metadata
model_data = joblib.load('odisha_yield_model.joblib')
model = model_data['model']
feature_columns = model_data['features']
performance = model_data['performance']
encoders = model_data.get('encoders', {})

print(f"Model loaded successfully!")
print(f"Accuracy: {performance['accuracy']:.1f}%")

app = Flask(__name__)
CORS(app)  # <--- allow frontend JS to call API

def predict_crop_yield(district, crop, rainfall, temperature, soil_ph, 
                       nitrogen, phosphorus, potassium, irrigation_percent):
    data = {col: 0 for col in feature_columns}
    data['Year'] = 2024
    data['Rainfall_mm'] = rainfall
    data['Temperature_Max_C'] = temperature
    data['Temperature_Min_C'] = temperature - 8
    data['Soil_pH'] = soil_ph
    data['Nitrogen_kg_ha'] = nitrogen
    data['Phosphorus_kg_ha'] = phosphorus
    data['Potassium_kg_ha'] = potassium
    data['Irrigation_Percent'] = irrigation_percent

    if 'district' in encoders:
        data['District_encoded'] = encoders['district'].transform([district])[0]
    else:
        data['District_encoded'] = 0

    if 'crop' in encoders:
        crop_encoded = encoders['crop'].transform([crop])[0]
        data['Crop_encoded'] = crop_encoded
    else:
        data['Is_Paddy'] = 1 if crop.lower() == 'paddy' else 0

    features = pd.DataFrame([data])[feature_columns]
    prediction = model.predict(features)
    return round(float(prediction[0]), 0)

# Root route
@app.route('/')
def home():
    return jsonify({"message": "Crop Yield Prediction API is running!"})

# Health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': True,
        'accuracy': f"{performance['accuracy']:.1f}%"
    })

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        required_fields = ['district', 'crop', 'rainfall', 'temperature', 
                          'soil_ph', 'nitrogen', 'phosphorus', 'potassium', 
                          'irrigation_percent']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        prediction = predict_crop_yield(
            district=data['district'],
            crop=data['crop'],
            rainfall=data['rainfall'],
            temperature=data['temperature'],
            soil_ph=data['soil_ph'],
            nitrogen=data['nitrogen'],
            phosphorus=data['phosphorus'],
            potassium=data['potassium'],
            irrigation_percent=data['irrigation_percent']
        )
        return jsonify({
            'predicted_yield': prediction,
            'unit': 'kg/ha',
            'accuracy': f"{performance['accuracy']:.1f}%",
            'district': data['district'],
            'crop': data['crop'],
            'status': 'success'
        })

    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Load trained ML model
model = joblib.load('mental_health_model.pkl')

# Label mapping
mental_state_labels = {
    0: "At Risk",
    1: "Healthy",
    2: "Stressed"
}

# Home route
@app.route('/')
def home():
    return jsonify({
        "message": "MindCare AI Backend Running"
    })

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():

    try:
        data = request.json

        # Extract features
        features = np.array([[
            data['age'],
            data['gender'],
            data['platform'],
            data['daily_screen_time_min'],
            data['social_media_time_min'],
            data['negative_interactions_count'],
            data['positive_interactions_count'],
            data['sleep_hours'],
            data['physical_activity_min']
        ]])

        # Predict
        prediction = model.predict(features)[0]

        # Convert label
        result = mental_state_labels[int(prediction)]

        # Suggestions
        suggestions = []

        if result == "Stressed":
            suggestions = [
                "Reduce screen time",
                "Practice meditation",
                "Improve sleep schedule",
                "Exercise regularly"
            ]

        elif result == "At Risk":
            suggestions = [
                "Take regular breaks",
                "Avoid negative online interactions",
                "Maintain healthy routines"
            ]

        else:
            suggestions = [
                "Keep maintaining healthy habits",
                "Stay physically active"
            ]

        return jsonify({
            "prediction": result,
            "suggestions": suggestions
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })

# Run app
if __name__ == '__main__':
    app.run(debug=True)
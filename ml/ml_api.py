from fastapi import FastAPI, Query
import joblib
from rag_service import router as rag_router

app = FastAPI()
# app.include_router(rag_router, prefix="/rag")
classifier = joblib.load("expense_classifier.pkl")
vectorizer = joblib.load("vectorizer.pkl")
spending_model = joblib.load("spending_model.pkl")
anomaly_model = joblib.load("anomaly_model.pkl")

@app.get("/")
def home():
    return {"message": "ML API running"}


# Category prediction
# Category prediction WITH CONFIDENCE
@app.post("/predict-category")
def predict_category(data: dict):
    
    text = data["text"]
    
    # Step 1: Transform text to numbers
    vec = vectorizer.transform([text])
    
    # Step 2: Get probabilities for ALL categories
    probabilities = classifier.predict_proba(vec)[0]
    
    # Step 3: Get category names
    categories = classifier.classes_
    
    # Step 4: Find which category has highest probability
    max_index = probabilities.argmax()
    predicted_category = categories[max_index]
    confidence = probabilities[max_index]
    
    # Step 5: Return category + confidence + all probabilities
    return {
        "category": predicted_category,
        "confidence": float(confidence),
        "all_probabilities": {
            categories[i]: float(probabilities[i]) 
            for i in range(len(categories))
        }
    }

# Spending prediction
@app.get("/predict-spending")
def predict_spending(month: int = Query(...)):

    prediction = spending_model.predict([[month]])

    return {"predicted_spending": float(prediction[0])}

# Anomaly detection
@app.post("/detect-anomaly")
def detect_anomaly(data: dict):

    amount = data["amount"]

    result = anomaly_model.predict([[amount]])

    if result[0] == -1:
        return {"anomaly": True}
    else:
        return {"anomaly": False}
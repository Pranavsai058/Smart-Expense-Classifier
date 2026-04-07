from fastapi import APIRouter
from sentence_transformers import SentenceTransformer
import numpy as np

router = APIRouter()

model = None

def get_model():
    global model
    if model is None:
        from sentence_transformers import SentenceTransformer
        model = SentenceTransformer("all-MiniLM-L6-v2")
    return model

user_documents[user_id] = get_model().encode(docs)
user_vectors[user_id] = get_model().encode(docs)


@router.post("/load-expenses")
def load_expenses(data: dict):
    user_id = data.get("userId")
    docs = data.get("documents")

    if not user_id or not docs:
        return {"error": "Missing userId or documents"}

    user_documents[user_id] = docs
    user_vectors[user_id] = model.encode(docs)

    return {"status": "documents loaded"}


@router.post("/ask")
def ask_question(data: dict):
    question = data.get("question", "").lower()
    user_id = data.get("userId")

    if user_id not in user_documents:
        return {"answer": "No expense data found for this user."}

    documents = user_documents[user_id]

    if len(documents) == 0:
        return {"answer": "No expenses recorded yet."}

    categories, totals, counts = [], [], []

    for doc in documents:
        try:
            parts = doc.split(" ")
            categories.append(parts[0])
            totals.append(int(parts[2]))
            counts.append(int(parts[4]))
        except:
            continue

    if not totals:
        return {"answer": "Invalid data format."}

    max_index = np.argmax(totals)
    min_index = np.argmin(totals)

    highest_category = categories[max_index]
    highest_total = totals[max_index]

    lowest_category = categories[min_index]
    lowest_total = totals[min_index]

    total_spending = sum(totals)

    if "most" in question:
        return {"answer": f"You spend the most on {highest_category} with ₹{highest_total}."}

    if "least" in question:
        return {"answer": f"You spend the least on {lowest_category} with ₹{lowest_total}."}

    if "total" in question:
        return {"answer": f"Your total spending is ₹{total_spending}."}

    if "reduce" in question or "save" in question:
        return {
            "answer": f"Your highest spending category is {highest_category}. Reducing it may help you save."
        }

    return {
        "answer": f"Your highest spending category is {highest_category} with ₹{highest_total}."
    }
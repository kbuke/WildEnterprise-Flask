from functools import wraps
from flask import session

def require_hotel_login(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "hotel_id" not in session:
            return {"error": "Unauthorized"}, 401 
        return f(*args, **kwargs)
    return wrapper
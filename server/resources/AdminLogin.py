import os 
from flask import request, session
from flask_restful import Resource

from config import bcrypt

# Any change to email or passwords should be done in console, very secure.

class AdminLogin(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password", "")

        admin_email = os.getenv("ADMIN_EMAIL")
        admin_pw = os.getenv("ADMIN_PW")

        if email != admin_email or not bcrypt.check_password_hash(admin_pw, password):
            return {"error": "Invalid email or password"}, 401 

        session["is_admin"] = True
        return {"email": admin_email}, 200 

class AdminLogout(Resource):
    def delete(self):
        session.pop("is_admin", None)
        return {}, 204 

class AdminCheckSession(Resource):
    def get(self):
        if not session.get("is_admin"):
            return {"error": "Not logged in"}, 401
        return {"email": os.getenv("ADMIN_EMAIL")}, 200
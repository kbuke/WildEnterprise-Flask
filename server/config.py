from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData
from dotenv import load_dotenv
from flask_login import LoginManager
from flask_mail import Mail

import os

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SECRET_KEY'] = os.getenv("APP_SECRET_KEY")
# Handle Email Logic
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("GMAIL_ADDRESS")
app.config["MAIL_PASSWORD"] = os.environ.get("GMAIL_APP_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("GMAIL_ADDRESS")
mail = Mail(app)

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

# cors = CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# login_manager = LoginManager()
# login_manager.init_app(app)

# @login_manager.user_loader
# def load_user(user_id):
#     from models.UserModel import UserModel
#     return UserModel.query.get(int(user_id))
from flask import make_response, request
from flask_restful import Resource

from sqlalchemy.exc import IntegrityError

from config import db

class BaseResource(Resource):
    model = None

    # Get ALL Instances of a model
    def get_all(self):
        records = [record.to_dict() for record in self.model.query.all()]
        return records, 200
    
    # Get SPECIFIC Instance of a model
    def get_specific(self, id):
        record = self.model.query.filter(self.model.id == id).first()
        if not record:
            return{"error": f"{self.model.__name__} {id} not found"}, 404
        
        return make_response(record.to_dict(), 200)
    
    # Create New Instance for Model
    def post_instance(self):
        data = request.get_json()

        if not data:
            return{"error": "Missing JSON Data"}, 404
        
        mapped_data = {}
        for key, value in data.items():
            mapped_key = self.field_map.get(key, key)
            mapped_data[mapped_key] = value
        try:
            new_record = self.model(**mapped_data)

            if hasattr(new_record, "validate_unique"): # ensure instance is unique
                new_record.validate_unique()
            
            db.session.add(new_record)
            db.session.commit()
            return new_record.to_dict(), 201
        except(ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": [str(e)]}, 400
    
    # Patch Current Instance in Model
    def patch_instance(self, id, data=None):
        record = self.model.query.filter(self.model.id == id).first()
        if data is None:
            data = request.get_json()

        if not record:
            return {"error": f"{self.model.__name__} {id} not registered"}, 404

        try:
            mapped_data = {}
            for key, value in data.items():
                mapped_key = getattr(self, "field_map", {}).get(key, key)
                mapped_data[mapped_key] = value

            for attr, val in mapped_data.items():
                setattr(record, attr, val)

            db.session.commit()
            return make_response(record.to_dict(), 202)

        except (ValueError, IntegrityError) as e:
            db.session.rollback()
            return {"error": [str(e)]}, 400
    
    # Delete Current Instance in Model
    def delete_instance(self, id):
        record = self.model.query.filter(self.model.id == id).first()
        if record:
            db.session.delete(record)
            db.session.commit()
            return {"message": f"{self.model.__name__} {id} Deleted"}, 200
        else:
            return {"error": f"{self.model.__name__} {id} Not Found"}, 404
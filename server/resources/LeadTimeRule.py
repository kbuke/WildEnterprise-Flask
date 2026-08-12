from models.HotelModels.LeadTimeRuleModel import LeadTimeRuleModel
from resources.BaseResource import BaseResource

from decorators.require_hotel_login import require_hotel_login

from functions.check_hotel_ownership import check_hotel_ownership

from flask import request, session

class AllLeadTimeRule(BaseResource):
    model = LeadTimeRuleModel

    field_map = {
        "minDays": "min_days",
        "maxDays": "max_days",
        "multiplier": "multiplier",
        "label": "label",
        "hotelId": "hotel_id",
        "roomId": "room_id"
    }

    def get(self):
        return self.get_all()

    @require_hotel_login
    def post(self):
        data = request.get_json() or {}
        data["hotelId"] = session.get("hotel_id")
        return self.post_instance()

class SpecificLeadTimeRule(BaseResource):
    model = LeadTimeRuleModel
    
    field_map = {
        "minDays": "min_days",
        "maxDays": "max_days",
        "multiplier": "multiplier",
        "label": "label",
        "hotelId": "hotel_id",
        "roomId": "room_id"
    }

    @require_hotel_login
    def get(self, id):
        return self.get_specific(id)

    @require_hotel_login
    def patch(self, id):
        lead_time, error = check_hotel_ownership(id, "Lead Time", LeadTimeRuleModel)
        if error:
            return error
        return self.patch_instance(id)

    @require_hotel_login
    def delete(self, id):
        lead_time, error = check_hotel_ownership(id, "Lead Time", LeadTimeRuleModel)
        if error:
            return error
        return self.delete_instance(id)
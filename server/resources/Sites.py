from resources.BaseResource import BaseResource

from models.SiteModel import SiteModel

from decorators.require_admin_login import require_admin_login

from flask import request

class AllSites(BaseResource):
    model = SiteModel

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info"
    }

    def get(self):
        return self.get_all()

    @require_admin_login
    def post(self):
        return self.post_instance()


class SpecificSite(BaseResource):
    model = SiteModel

    field_map = {
        "name": "name",
        "img": "img",
        "info": "info"
    }

    def get(self, id):
        return self.get_specific(id)

    @require_admin_login
    def patch(self, id):
        return self.patch_instance(id)

    @require_admin_login
    def delete(self, id):
        return self.delete_instance(id)
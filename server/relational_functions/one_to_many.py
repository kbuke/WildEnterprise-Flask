from config import db

def one_to_many_rltshp(model, reference):
    return db.relationship(model, backref = reference)

def one_to_many_fk(tablename, is_null = False):
    return db.Column(db.Integer, db.ForeignKey(f"{tablename}.id"), nullable = is_null)
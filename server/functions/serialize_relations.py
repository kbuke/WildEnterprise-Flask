def serialize_relations(relation, fields=None):
    if not fields:
        return (f"-{relation}",)
    return tuple(f"-{relation}.{field}" for field in fields)
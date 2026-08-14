import re

def validate_slug(value):
    slug = re.sub(r'[^a-z0-9]+', '-', value.lower()).strip('-')

    if not slug:
        raise ValueError("Please enter a valid slug-title")

    return slug


def make_slug_default(source_field):
    """
    Returns a function suitable for use as a column's `default=`, which
    derives a slug from another column's value at insert time.

    Usage:
        slug = db.Column(db.String, default=make_slug_default("name"))
    """
    def generate_slug(context):
        source_value = context.get_current_parameters()[source_field]
        return validate_slug(source_value)

    return generate_slug
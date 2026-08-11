import re 

def validate_slug(value):
    slug = re.sub(r'[^a-z0-9]+', '-', value.lower()).strip()

    if not slug:
        raise ValueError("Please enter a valid slug-title")

    return slug
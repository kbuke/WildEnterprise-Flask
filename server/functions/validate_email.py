import re

def validate_email(address):
    email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    if not re.match(email_regex, address):
        raise ValueError(f"{address} is not a valid email")

    return address
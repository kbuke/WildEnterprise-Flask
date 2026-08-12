# functions/validate_dates.py
from datetime import date


def to_date(value, key):
    """Convert a string to a date object; leaves date objects untouched. Raises ValueError on bad format."""
    if isinstance(value, str):
        try:
            return date.fromisoformat(value)
        except ValueError:
            raise ValueError(f"{key} must be in YYYY-MM-DD format.")
    return value


def validate_date_order(start_date, end_date, start_key, end_key):
    if start_date and end_date and end_date < start_date:
        raise ValueError(f"{end_key} must be on or after {start_key}")
    return end_date


def make_date_range_validators(start_field, end_field):
    """
    Returns a (validate_start, validate_end) pair of functions, ready to be
    wrapped in @validates(...), for any paired start/end date columns.

    Usage inside a model:
        validate_x_start, validate_x_end = make_date_range_validators("x_start_date", "x_end_date")
        validate_x_start = validates("x_start_date")(validate_x_start)
        validate_x_end = validates("x_end_date")(validate_x_end)
    """
    def validate_start(self, key, value):
        return to_date(value, key)

    def validate_end(self, key, value):
        value = to_date(value, key)
        start_value = getattr(self, start_field)
        return validate_date_order(start_value, value, start_field, end_field)

    return validate_start, validate_end
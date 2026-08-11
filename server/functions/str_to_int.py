def str_to_number(value, data_type):
    valid_number_data_types = ["Float", "Int"]
    if not data_type.capitalize() in valid_number_data_types:
        raise ValueError("Please ensure datatype is either float or int")
    if isinstance(value, bool):
        raise ValueError("Value can not be a boolean")
    if isinstance(value, str):
        if data_type == "Float":
            try:
                value = float(value)
            except ValueError:
                raise ValueError(f"Unable to convert {value} to boolean")
        if data_type == "Int":
            try:
                value = int(value)
            except ValueError:
                raise ValueError(f"Unable to convert {value} to integer")
    return value
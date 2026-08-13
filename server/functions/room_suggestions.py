from itertools import combinations_with_replacement

from models.HotelModels.RoomModel import RoomModel
from models.HotelModels.RoomBookingModel import get_available_rooms
from functions.pricing import price_stay

def suggest_room_combinations(hotel_id, arrival_date, departure_date, party_size, max_rooms = 4):
    rooms = RoomModel.query.filter_by(hotel_id=hotel_id).all()

    options = []

    for room in rooms:
        available = get_available_rooms(room.id, arrival_date, departure_date)
        if available > 0:
            options.append((room, available))

    if not options:
        return []

    lookup = {r.id: (r, avail) for r, avail in options}
    room_ids = [r.id for r, _ in options]

    valid_combos = []
    for size in range(1, max_rooms + 1):
        for combo in combinations_with_replacement(room_ids, size):
            counts = {}
            for rid in combo:
                counts[rid] = counts.get(rid, 0) + 1

            if any(counts[rid] > lookup[rid][1] for rid in counts):
                continue # state there is not enough of this room type available 

            total_capacity = sum(lookup[rid][0].max_people * qty for rid, qty in counts.items())
            if total_capacity < party_size:
                continue 

            total_price = sum(
                price_stay(lookup[rid][0], arrival_date, departure_date) * qty
                for rid, qty in counts.items()
            )

            valid_combos.append({
                "rooms": [
                    {"room": lookup[rid][0].to_dict(), "quantity": qty}
                    for rid, qty in counts.items()
                ],
                "total_capacity": total_capacity,
                "total_price": round(total_price, 2)
            })
        if valid_combos:
            break # stop growing combo size once smallest valid size is found 
    valid_combos.sort(key = lambda c: (c["total_price"], c["total_capacity"] - party_size))
    return valid_combos[:5]
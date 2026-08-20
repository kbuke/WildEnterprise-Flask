# from models.HotelModels.RoomModel import RoomModel
# from models.HotelModels.RoomBookingModel import get_booked_quantity
# from functions.holds import get_active_hold_quantity
# from functions.pricing import price_stay


# def suggest_room_combinations(
#     hotel_id,
#     arrival,
#     departure,
#     party_size
# ):

#     rooms = RoomModel.query.filter_by(
#         hotel_id=hotel_id
#     ).all()

#     available_rooms = []

#     for room in rooms:

#         booked = get_booked_quantity(
#             room.id,
#             arrival,
#             departure
#         )

#         held = get_active_hold_quantity(
#             room.id,
#             arrival,
#             departure
#         )

#         available = (
#             room.no_of_rooms
#             - booked
#             - held
#         )

#         if available <= 0:
#             continue

#         available_rooms.append({
#             "room": room,
#             "available": available
#         })

#     combinations = []

#     def generate_combinations(
#         index,
#         selected_rooms,
#         total_capacity
#     ):

#         # -------------------------
#         # We have enough capacity
#         # -------------------------

#         if total_capacity >= party_size:

#             total_price = 0

#             for selected in selected_rooms:

#                 room = selected["room"]
#                 quantity = selected["quantity"]

#                 total_price += (
#                     price_stay(
#                         room,
#                         arrival,
#                         departure
#                     )
#                     * quantity
#                 )

#             # combinations.append({
#             #     "rooms": selected_rooms.copy(),
#             #     "total_capacity": total_capacity,
#             #     "total_price": total_price
#             # })

#             combinations.append({
#                 "rooms": [
#                     {
#                         "room": selected["room"].to_dict(),
#                         "quantity": selected["quantity"]
#                     }
#                     for selected in selected_rooms
#                 ],
#                 "total_capacity": total_capacity,
#                 "total_price": total_price
#             })

#             return

#         # -------------------------
#         # No more room types
#         # -------------------------

#         if index >= len(available_rooms):
#             return

#         room_data = available_rooms[index]

#         room = room_data["room"]
#         available = room_data["available"]

#         # -------------------------
#         # Try every quantity
#         # -------------------------

#         for quantity in range(available + 1):

#             new_capacity = (
#                 total_capacity
#                 + room.max_people * quantity
#             )

#             if quantity > 0:

#                 # selected_rooms.append({
#                 #     "room": room.to_dict(),
#                 #     "quantity": quantity
#                 # })
#                 selected_rooms.append({
#                     "room": room,
#                     "quantity": quantity
#                 })

#             generate_combinations(
#                 index + 1,
#                 selected_rooms,
#                 new_capacity
#             )

#             if quantity > 0:
#                 selected_rooms.pop()

#     generate_combinations(
#         index=0,
#         selected_rooms=[],
#         total_capacity=0
#     )

#     # --------------------------------
#     # Don't return inefficient options
#     # --------------------------------

#     if not combinations:
#         return []

#     combinations.sort(
#         key=lambda combination: (
#             combination["total_capacity"],
#             combination["total_price"]
#         )
#     )

#     return combinations


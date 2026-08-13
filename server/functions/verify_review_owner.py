from models.HotelModels.ReviewModel import ReviewModel

def verify_review_owner(review_id, email, booking_ref):
    review = ReviewModel.query.get(review_id)
    if not review:
        return None, ({"error": f"Review {review_id} not found"}, 404)

    if review.email != email or review.booking.booking_ref != booking_ref:
        return None, ({"error": "Unauthorized"}, 403)

    return review, None
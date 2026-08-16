// Hooks/HotelHooks/useHotelAdminLogout.ts
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../ReactQuery/queryClient";

async function postHotelAdminLogout() {
    const res = await fetch(`/api/hoteladmin/logout`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to log out");
}

export function usePostHotelAdminLogout() {
    return useMutation({
        mutationFn: postHotelAdminLogout,
        onSuccess: () => {
            queryClient.setQueryData(["hotelAdminSession"], { is_hotel_admin: false });
        }
    });
}
// Hooks/HotelHooks/useCheckHotelAdminSession.ts
import { useQuery } from "@tanstack/react-query";
import type { CheckHotelSessionType } from "../../Types/HotelTypes";

async function checkHotelAdminSession(): Promise<CheckHotelSessionType | { is_hotel_admin: false }> {
    const res = await fetch(`/api/hoteladmin/checksession`, {
        credentials: "include"
    });

    if (!res.ok) {
        return { is_hotel_admin: false };
    }

    return res.json();
}

export function useCheckHotelAdminSession(options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: ["hotelAdminSession"],
        queryFn: checkHotelAdminSession,
        retry: false,
        staleTime: 0,
        gcTime: 0,
        enabled: options?.enabled ?? true
    });
}
import { useQuery } from "@tanstack/react-query";

async function checkAdminSession(): Promise<{ is_admin: boolean }> {
    const res = await fetch(`/api/admin/checksession`, {
        credentials: "include"
    });

    if (!res.ok) {
        return { is_admin: false };
    }

    return res.json();
}

export function useCheckAdminSession() {
    return useQuery({
        queryKey: ["adminSession"],
        queryFn: checkAdminSession,
        retry: false,
        staleTime: 0
    });
}
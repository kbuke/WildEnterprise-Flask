import { useLayoutEffect } from "react";

export function useScrollLock(isActive: Boolean){
    useLayoutEffect(() => {
        if(!isActive) return;

        const scrollY = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = "100%"

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";

            window.scrollTo(0, scrollY)
        }
    }, [isActive])
}
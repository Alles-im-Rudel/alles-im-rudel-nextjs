import { useEffect, useRef, useState } from "react";
export default function useComponentVisible(initial: boolean) {
    const [isVisible, setIsVisible] = useState<boolean>(initial);
    const ref = useRef<HTMLHeadingElement>(null);
    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setIsVisible(false);
        }
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Element)) {
            setIsVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleHideDropdown, true);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("keydown", handleHideDropdown, true);
            document.removeEventListener("click", handleClickOutside, true);
        };
    });
    return { ref, isVisible, setIsVisible };
}
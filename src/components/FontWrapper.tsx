import { useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";

export default function FontWrapper({ children }: { children: React.ReactNode }) {
    const { font, mode } = useAppSelector(state => state.theme);

    useEffect(() => {
        const html = document.documentElement;

        html.classList.remove("font-serif", "font-sans", "font-mono");

        if (font) {
            html.classList.add(`font-${font}`);
        }

        if (mode === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [font, mode]);

    return <>{children}</>
}

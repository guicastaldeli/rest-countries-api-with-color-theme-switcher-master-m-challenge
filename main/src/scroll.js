import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Scroll() {
    useEffect(() => {
        return() => {
            localStorage.setItem('spos', window.scrollY);
        }
    }, []);
}

export default Scroll;
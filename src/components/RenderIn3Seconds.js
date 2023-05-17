import {useEffect, useState} from "react";

const RenderIn3Seconds = () => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(!showComponent);
        }, 3000);
        return () => clearTimeout(timer);}, []);
    return null;
}

export default RenderIn3Seconds;

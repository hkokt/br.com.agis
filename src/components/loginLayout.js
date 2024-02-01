// ESTILOS
import camposStyle from '../../styles/campos.module.css';
import longinStyle from '../../styles/login.module.css';
// COMPONENTES
import input from '@/components/tags/input'
//LIBS
import { useState, useEffect, useRef } from 'react';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export default function loginLayout(props) {
    const size = useWindowSize();
    const myElementRef = useRef(null);

    useEffect(() => {
        const element = document.getElementById('site');
        if (element) {
            element.style.height = `${size.height - 50}px`;
            // Polyfill para setPointerCapture
            if (!element.setPointerCapture) {
                element.setPointerCapture = element.setCapture;
            }
        }
    }, [size.height]);

    return (
        <div ref={myElementRef}>
            <div className={longinStyle.site} id="site">

            </div>
        </div>
    )
}
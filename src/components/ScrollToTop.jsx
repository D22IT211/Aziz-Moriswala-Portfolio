import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            let attempts = 0;
            const maxAttempts = 20; // Try for 2 seconds (handling the 1s loader)

            const scrollToElement = () => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(scrollToElement, 100);
                }
            };

            // Start trying
            setTimeout(scrollToElement, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}

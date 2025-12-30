import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
    scriptSrc: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ scriptSrc }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        
        const container = containerRef.current;
        // Clean up any existing content to prevent multiple ad injections
        container.innerHTML = '';
        
        // Create the loader script element
        const loaderScript = document.createElement('script');
        loaderScript.type = 'text/javascript';
        
        // Use the passed scriptSrc
        loaderScript.text = `
            (function(meoidw){
                var d = document,
                    s = d.createElement('script'),
                    // In modern browsers, document.currentScript refers to the script currently being processed.
                    l = d.currentScript || d.scripts[d.scripts.length - 1];
                s.settings = meoidw || {};
                s.src = "${scriptSrc}";
                s.async = true;
                s.referrerPolicy = 'no-referrer-when-downgrade';
                if (l && l.parentNode) {
                    l.parentNode.insertBefore(s, l);
                }
            })({});
        `;
        
        // Append the loader script to our ref container.
        container.appendChild(loaderScript);

        return () => {
            container.innerHTML = '';
        };
    }, [scriptSrc]);

    return (
        <div className="flex justify-center w-full my-6 min-h-[90px] overflow-visible">
            {/* Unique container helps ensure the script injects in the correct DOM position */}
            <div ref={containerRef} className="ad-slot-wrapper w-full flex justify-center items-center" />
        </div>
    );
};

export default AdBanner;
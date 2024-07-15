import React, {useEffect, useRef, useState} from 'react';

// Helper function to calculate contrast
const getContrast = (rgb1, rgb2) => {
    const luminance = (rgb) => {
        const a = rgb.map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const l1 = luminance(rgb1);
    const l2 = luminance(rgb2);

    const contrast = l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    return contrast;
};

const ImageCreator = ({height, width, text = null}) => {
    const minContrast = 4.5;
    const canvasRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Set canvas size
        canvas.width = width;
        canvas.height = height;

        // Fill the background
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, 0, width, height);

        if (text) {
            const fontSize = Math.floor(height / 1.5);
            ctx.font = `bold ${fontSize}px RoobertCEZ`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Decide font color based on contrast
            const backgroundColor = [r, g, b];
            const whiteContrast = getContrast(backgroundColor, [255, 255, 255]);
            const blackContrast = getContrast(backgroundColor, [0, 0, 0]);

            let fontColor = 'white'; // default to white
            if (whiteContrast < minContrast && blackContrast > whiteContrast) {
                fontColor = 'black';
            }

            ctx.fillStyle = fontColor;
            ctx.fillText(text, width / 2, height / 1.8);
        }

        // Convert canvas to image
        setImageUrl(canvas.toDataURL());
    }, [height, width, text, minContrast]);

    return (
        <>
            <canvas ref={canvasRef} style={{display: 'none'}}/>
            {imageUrl && <img src={imageUrl} alt="Generated"/>}
        </>
    );
};

export default ImageCreator;

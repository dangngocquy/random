import React from 'react';
import dao from '../assets/hoadao.gif';
import mai from '../assets/hoamai.png';
import hoadao from '../assets/hoadao.png';

function Flower() {
    const flowerImages = [dao, mai, hoadao];

    return (
        <div className="snowflakes">
            {flowerImages.map((flower, index) => (
                <div key={index} className="snowflake">
                    <img src={flower} width="20" alt="Hoa" />
                </div>
            ))}
            {flowerImages.map((flower, index) => (
                <div key={index} className="snowflake">
                    <img src={flower} width="20" alt="Hoa" />
                </div>
            ))}
            {flowerImages.map((flower, index) => (
                <div key={index} className="snowflake">
                    <img src={flower} width="20" alt="Hoa" />
                </div>
            ))}
            {flowerImages.map((flower, index) => (
                <div key={index} className="snowflake">
                    <img src={flower} width="20" alt="Hoa" />
                </div>
            ))}
             {flowerImages.map((flower, index) => (
                <div key={index} className="snowflake">
                    <img src={flower} width="20" alt="Hoa" />
                </div>
            ))}
        </div>
    );
}

export default Flower;

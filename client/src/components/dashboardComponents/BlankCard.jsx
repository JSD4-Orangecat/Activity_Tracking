import React, { useState } from 'react';
import '../../assets/styles/dashboardCSS/BlankCard.css';

function BlankCard() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const cardClassName = `blankCard ${isHovered ? 'hovered' : ''}`;

    return (
        <div
            className={cardClassName}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="plusCharacter">+</div>
            <div className="blankCard-color"></div>
        </div>
    );
}

export default BlankCard;
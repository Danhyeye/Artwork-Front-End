import React, { useState } from 'react';
import Header from './Header';
import Artwork from './Artwork';

function BadgeCart() {
    const [badgeCount, setBadgeCount] = useState(0);

    const handleLoyaltyIconClick = () => {
        // console.log(badgeCount + 1);
        setBadgeCount(badgeCount + 1);
    };

    return (
        <div>
            <Header badgeCount={badgeCount} />
            <Artwork onLoyaltyIconClick={handleLoyaltyIconClick} />
        </div>
    );
}

export default BadgeCart;

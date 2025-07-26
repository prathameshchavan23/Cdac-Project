import React from 'react';
import cdacLogo from "../assets/landpage.jpg"
const PromotionalPanel = () => (
    <div className="hidden md:block md:w-1/2 lg:w-2/5 p-4 lg:rounded-6xl">
        <img 
            src={cdacLogo}
            alt="CDAC LOGO" 
            className="w-full h-full object-cover rounded-none md:rounded-lg lg:rounded-2xl shadow-lg"
        />
    </div>
);

export default PromotionalPanel;

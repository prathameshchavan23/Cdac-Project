import React from 'react';
import cdacLogo from "../assets/cdac_logo.png"
const FormHeader = () => (
    <div className="text-center">
        <img 
            src={cdacLogo} 
            alt="CDAC ACTS Logo" 
            className="w-50 h-25 mx-auto mb-2"
        />
        <p className="font-bold text-xl text-gray-700">CDAC ACTS</p>
    </div>
);

export default FormHeader;

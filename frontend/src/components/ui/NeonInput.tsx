import React from 'react';

interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const NeonInput: React.FC<NeonInputProps> = ({ icon, className = "", ...props }) => {
    return (
        <div className="relative group">
            {/* Input Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/50 to-primary/50 rounded-lg blur opacity-0 group-focus-within:opacity-75 transition duration-500"></div>

            <div className="relative flex items-center bg-black/50 backdrop-blur-xl rounded-lg border border-white/10 px-4 py-3">
                {icon && <span className="text-muted mr-3 group-focus-within:text-white transition-colors">{icon}</span>}
                <input
                    className={`
                        w-full bg-transparent text-white placeholder-gray-500 focus:outline-none
                        ${className}
                    `}
                    {...props}
                />
            </div>
        </div>
    );
};

export default NeonInput;

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: React.ReactNode;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, variant = 'primary', icon, className = "", ...props }) => {
    const baseStyles = "relative px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(112,66,248,0.4)] hover:shadow-[0_0_35px_rgba(0,246,255,0.6)]",
        secondary: "bg-secondary text-black hover:bg-secondary/90 shadow-[0_0_20px_rgba(0,246,255,0.4)] hover:shadow-[0_0_35px_rgba(112,66,248,0.6)]",
        outline: "bg-transparent border border-white/20 text-white hover:border-white/50 hover:bg-white/5"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

            <span className="relative z-10 flex items-center gap-2">
                {icon}
                {children}
            </span>
        </motion.button>
    );
};

export default GlowingButton;

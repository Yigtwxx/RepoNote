import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = false }) => {
    return (
        <motion.div
            className={`
                relative overflow-hidden
                bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl
                ${hoverEffect ? 'hover:shadow-[0_0_30px_rgba(112,66,248,0.2)] hover:border-primary/30 transition-all duration-300 group' : ''}
                ${className}
            `}
        >
            {/* Inner Glow Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;

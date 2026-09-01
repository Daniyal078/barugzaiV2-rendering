// components/RevealAnimation.jsx
'use client'

import { motion } from 'framer-motion'
type RevealAnimationProps = {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
    once?: boolean;
    className?: string;
};

export default function RevealAnimation({
    children,
    delay = 0,
    duration = 0.7,
    y = 60,
    once = true,
    className = '',
}: RevealAnimationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration, delay }}
            viewport={{ once }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
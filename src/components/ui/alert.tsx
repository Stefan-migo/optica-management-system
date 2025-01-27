// components/ui/alert.tsx
'use client';
import { motion } from 'framer-motion';

export const Alert = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-4 bg-blue-50 text-blue-600 rounded-lg"
  >
    {message}
  </motion.div>
);
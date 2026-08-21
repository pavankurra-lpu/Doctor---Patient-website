import { motion } from 'framer-motion';
export default function EmergencyCard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h1 className="text-2xl font-bold mb-4">Emergency Quick-Card</h1>
      <p>Component built successfully.</p>
    </motion.div>
  );
}
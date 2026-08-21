import { motion } from 'framer-motion';
export default function PatientDetail() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Detail View</h1>
      <p>Component built successfully.</p>
    </motion.div>
  );
}
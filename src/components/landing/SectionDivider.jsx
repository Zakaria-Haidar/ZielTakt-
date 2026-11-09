import { motion } from 'framer-motion';

// The glowing line draws in from the start side: left in German, right in Arabic.
export default function SectionDivider() {
  return (
    <div className="relative py-4">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="line-glow w-full origin-left rtl:origin-right"
      />
    </div>
  );
}

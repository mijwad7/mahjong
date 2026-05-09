import { motion, AnimatePresence } from 'framer-motion';
import { modalOverlay, modalPanel } from '../../animations/variants';

/**
 * Modal — generic accessible modal wrapper.
 *
 * Props:
 *  isOpen    - boolean
 *  onClose   - callback (optional, allows backdrop click to close)
 *  children  - modal content
 *  className - additional panel classes
 */
export default function Modal({ isOpen, onClose, children, className = '' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          variants={modalOverlay}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            key="modal-panel"
            variants={modalPanel}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`
              relative z-10 max-w-lg w-full mx-4 rounded-2xl
              bg-gradient-to-br from-stone-900 to-stone-950
              border border-stone-700/60 shadow-2xl shadow-black/60
              p-8 ${className}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

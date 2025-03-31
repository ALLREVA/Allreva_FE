import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

import { useToastStore } from 'stores';
import { CaptionText } from 'styles/Typography';

const ToastItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: fixed;
  bottom: 10%;
  left: 50%;
  z-index: 2000;
  max-width: 36rem;
  padding: 1.2rem 2rem;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.dark[800]};
`;

const Toast = () => {
  const { toast } = useToastStore(['toast']);

  return (
    <AnimatePresence>
      {toast && (
        <ToastItem
          animate={{ x: '-50%', y: 0, opacity: 1 }}
          exit={{ x: '-50%', y: 100, opacity: 0 }}
          initial={{ x: '-50%', y: 100, opacity: 0 }}
          key={toast.id}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {toast.icon}
          <CaptionText>{toast.content}</CaptionText>
        </ToastItem>
      )}
    </AnimatePresence>
  );
};

export default Toast;

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Tagline = () => {
  return (
    <TaglineContainer
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 15 }}
      transition={{
        duration: 0.8,
        delay: 1.0,
        ease: 'easeOut',
      }}
    >
      <TaglineText>모든 공연, 한 번에 준비하는 새로운 방법</TaglineText>
    </TaglineContainer>
  );
};

const TaglineContainer = styled(motion.div)`
  margin-top: 1.6rem;
  text-align: center;
`;

const TaglineText = styled.p`
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  letter-spacing: -0.02em;
`;

export default Tagline;

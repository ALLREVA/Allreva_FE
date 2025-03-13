import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <LogoContainer animate="visible" initial="hidden" variants={containerVariants}>
      <LogoText>
        <FirstPart variants={itemVariants}>All</FirstPart>
        <Colon variants={itemVariants}>:</Colon>
        <SecondPart variants={itemVariants}>RE</SecondPart>
        <ThirdPart variants={itemVariants}>VA</ThirdPart>
      </LogoText>
    </LogoContainer>
  );
};

const LogoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled(motion.div)`
  display: flex;
  align-items: baseline;
  font-size: 6.4rem;
  font-weight: bold;
  letter-spacing: 0.05em;
`;

const FirstPart = styled(motion.span)`
  color: #a665fc;
`;

const Colon = styled(motion.span)`
  color: #a665fc;
  margin: 0 0.2rem;
`;

const SecondPart = styled(motion.span)`
  color: white;
`;

const ThirdPart = styled(motion.span)`
  color: white;
`;

export default AnimatedLogo;

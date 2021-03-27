import styled from 'styled-components';
import { motion } from 'framer-motion';

const Message = styled(motion.p)`
  grid-column: 1 / 4;
  justify-content: center;
  padding: 1em;
  font-size: 1.6rem;
  line-height: 1.3;
  text-align: center;
  height: 100%;
`;

export default Message;

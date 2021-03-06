import styled from 'styled-components';
import { motion } from 'framer-motion';

const Button = styled(motion.button)`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.theme.lightShade};
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  height: 2em;
  width: 8em;
  border: none;
  border-radius: 0.5em;
`;

export default Button;

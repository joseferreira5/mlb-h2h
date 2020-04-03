import styled from 'styled-components';
import { motion } from 'framer-motion';

const ComparisonLayout = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 20% 1fr;
  grid-template-rows: 6% 10% 10% 1fr;
  grid-row-gap: 0.5em;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  padding: 0.2em;

  &::-webkit-scrollbar {
    background-color: #fff;
    border-radius: 1em;
    width: 0.2em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.mainBrand};
    border-radius: 1em;
  }
`;

export default ComparisonLayout;

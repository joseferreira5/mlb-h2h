import styled from 'styled-components';
import { motion } from 'framer-motion';

const SearchLayout = styled(motion.section)`
  display: grid;
  grid-template-columns: 1fr 10% 1fr;
  grid-template-rows: 15% 1fr 1fr;
  grid-row-gap: 2em;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;

  .compare-btn {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    align-self: start;
    justify-self: center;
  }
`;

export default SearchLayout;

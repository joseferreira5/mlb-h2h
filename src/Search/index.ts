import { connect } from 'react-redux';

import SearchComponent from './component';
import { search } from './actions';
import type { RootState } from '../store';
import { Player } from '../types';

type MapState = (state: RootState) => {
  left: Player | null;
  right: Player | null;
};

const mapState: MapState = ({ search }) => ({
  left: search.left,
  right: search.right,
});

const mapDispatch = {
  search,
};

export default connect(mapState, mapDispatch)(SearchComponent);

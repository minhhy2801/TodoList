//containers (smart components)
//container talk with redux

import {setVisibilityFilter} from '../actions/visibilityFilter';
import Link from '../components/Link';
import {connect} from 'react-redux';

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
      onClick: () => {
        dispatch(setVisibilityFilter(ownProps.filter))
      }
    };
  };

  
//mapStateToProps(state, [ownProps])
const mapStateToLinkProps = (state, ownProps) => {
    return {
      active: ownProps.filter === state.visibilityFilter
    };
  };

export default connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);
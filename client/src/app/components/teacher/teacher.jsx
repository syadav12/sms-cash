import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { getSelected } from '../../actions/adminActions.jsx';
import { connect } from 'react-redux';

class Teacher extends React.Component { 
   constructor(props) {
    super(props);
  }

  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }
 
 componentWillMount() {
     this.props.getSelected(""+this.props.location.pathname);
 }

 render() {
   return(
     <div>
        <h3>Teacher</h3> 
     </div>
    );
  }
}
Teacher.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
};
Teacher.contextTypes = { 
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.adminReducer
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getSelected: (location) => {
        dispatch(getSelected(location))
      }
     
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);

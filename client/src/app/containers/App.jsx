import React from 'react';
import DrawerOpenRightExample from './SideBarMenu.jsx';
import TopBar from './TopBar.jsx'; 
let a = require('./../css/style.css');
export default class App extends React.Component {
   constructor(props) {
   super(props);
   this.handleToggle =  this.handleToggle.bind(this);
   this.state = {
        open: true
       };
   }
   handleToggle(){
       this.setState({open: !this.state.open});
   }
  render(){
    console.log('this is app.jsx')
    const contentStyle = {
        marginLeft: 70 ,transition: 'margin-left 100ms cubic-bezier(0.23, 1, 0.32, 1)'
    };

    if (this.state.open) {
      contentStyle.marginLeft = 230;
    }
    return (
      <div className="mymain">
        <div style={contentStyle}>
         <TopBar handleToggle = {this.handleToggle} open = {this.state.open}/>
        </div>
       <DrawerOpenRightExample handleToggle = {this.handleToggle} open = {this.state.open} />
      </div>
    );
  }
}

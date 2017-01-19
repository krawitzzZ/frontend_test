import React from 'react';
import AppBar from 'material-ui/AppBar';


export default class Menu extends React.PureComponent {
  render() {
    return (
      <AppBar
        title="Frontend Freelancer Test"
        showMenuIconButton={false}
      />
    );
  }
}

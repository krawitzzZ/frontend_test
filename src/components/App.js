import React from 'react';
import Menu from './common/Menu';

import '../stylesheets/main.scss';

export default class App extends React.Component {
  componentWillMount() {
    // do auth check logic here
  }

  render() {
    const {children} = this.props;

    return (
      <div className='container'>
        <div>
          <Menu/>
        </div>
        <div>
          {children}
        </div>
      </div>
    );
  }
}

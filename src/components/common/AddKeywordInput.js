import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class AddKeywordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  onInputChange(event) {
    this.setState({
      keyword: event.target.value.trim(),
    });
  }

  addNewKeyword() {
    if (!this.state.keyword.trim()) {
      return;
    }

    this.props.addKeyword(this.state.keyword);
    this.setState({
      keyword: '',
    });
  }

  render() {
    return (
      <ListItem hoverColor="white">
        <TextField value={this.state.keyword}
                   onChange={this.onInputChange.bind(this)}
                   hintText={this.props.hint} />
        <FlatButton onClick={this.addNewKeyword.bind(this)}
                    label="Add"
                    primary={true} />
      </ListItem>
    );
  }
}

AddKeywordInput.propTypes = {
  addKeyword: PropTypes.func.isRequired,
  hint: PropTypes.string.isRequired,
};

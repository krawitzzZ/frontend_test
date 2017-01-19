import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import AddKeywordInput from './AddKeywordInput';

export default class KeywordPaperElement extends React.Component {
  render() {
    const { keywords } = this.props;

    return (
      <div className="col-md-4 col-xs-6">
        <Paper zDepth={1}>
          <List>
            <Subheader>{this.props.subheader}</Subheader>
            {keywords.map((keyword, ind) => (
              <ListItem
                key={ind}
                primaryText={keyword}
                rightIcon={<CloseIcon onClick={this.props.deleteKeyword.bind(this, ind)} />}
              />
            ))}
          </List>
          <AddKeywordInput
            id="tw-input"
            hint={this.props.inputHint}
            addKeyword={this.props.addKeyword}
          />
        </Paper>
      </div>
    );
  }
}

KeywordPaperElement.defaultProps = {
  inputHint: '',
  subheader: '',
  keywords: [],
};

KeywordPaperElement.propTypes = {
  inputHint: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  keywords: PropTypes.array.isRequired,
  deleteKeyword: PropTypes.func.isRequired,
  addKeyword: PropTypes.func.isRequired,
};

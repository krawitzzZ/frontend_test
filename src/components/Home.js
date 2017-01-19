import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import GroupListElement from './common/GroupListElement';
import { USER_FETCH, UPDATE_USER_MATCH_GROUPS } from '../constants/user';

const style = {
  minHeight: '400px',
  width: '100%',
  textAlign: 'center',
  display: 'inline-block',
};

export class Home extends React.Component {
  componentDidMount() {
    this.fetchUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.groupsUpdating && !nextProps.user.groupsUpdating) {
      this.fetchUserInfo();
    }
  }

  fetchUserInfo() {
    this.props.dispatch({ type: USER_FETCH });
  }

  updateGroups(groups, index) {
    if (this.props.user.groupsUpdating) {
      return;
    }
    const { twitterMatchGroups, instagramMatchGroups } = this.props.user.userInfo;

    const refactoredTwitterMatchGroups = twitterMatchGroups.map(a => a);
    refactoredTwitterMatchGroups.splice(index, 1);
    refactoredTwitterMatchGroups.push(groups.twitterMatchGroup);

    const refactoredInstagramMatchGroups = instagramMatchGroups.map(a => a);
    refactoredInstagramMatchGroups.splice(index, 1);
    refactoredInstagramMatchGroups.push(groups.instagramMatchGroup);

    const data = {
      twitterMatchGroups: refactoredTwitterMatchGroups,
      instagramMatchGroups: refactoredInstagramMatchGroups,
    };

    this.props.dispatch({ type: UPDATE_USER_MATCH_GROUPS, data });
  }

  getGroups(twGroups, igGroups) {
    if (igGroups.length > twGroups.length) {
      return igGroups.map((gr, index) => {
        const twGroup = twGroups.length ? twGroups[index] : {};
        return {
          index: index,
          name: gr.name,
          instagramInfluencers: twGroup.influencers,
          twitterInfluencers: gr.influencers,
          keywords: twGroup.length ? _.uniq(gr.keywords.concat(twGroup.keywords)) : gr.keywords
        };
      });
    }

    return twGroups.map((gr, index) => {
      const igGroup = igGroups.length ? igGroups[index] : {};
      return {
        index: index,
        name: gr.name,
        instagramInfluencers: igGroup.influencers,
        twitterInfluencers: gr.influencers,
        keywords: igGroups.length ? _.uniq(gr.keywords.concat(igGroup.keywords)) : gr.keywords
      };
    });
  }

  render() {
    const { userInfo } = this.props.user;
    const groups = this.getGroups(
      userInfo.twitterMatchGroups || [],
      userInfo.instagramMatchGroups || []
    );

    return (
      <div className='page-home'>
        <Paper style={style} zDepth={1}>
          <List>
            <Subheader>Groups</Subheader>
            {groups.map(group => (
              <ListItem
                key={group.index}
                primaryText={group.name}
                secondaryText="Group Name"
                primaryTogglesNestedList={true}
                nestedItems={[<GroupListElement updateGroups={this.updateGroups.bind(this)}
                                                name={group.name}
                                                groupIndex={group.index}
                                                keywords={group.keywords}
                                                twInfluencers={group.twitterInfluencers}
                                                igInfluencers={group.instagramInfluencers}
                                                key={-group.index} />]}
              />
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(Home);

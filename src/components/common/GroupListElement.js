import React, { PropTypes } from 'react';
import KeywordPaperElement from './KeywordPaperElement';

const styles = {
  display: 'flex',
  flexWrap: 'nowrap',
};

export default class GroupListElement extends React.Component {
  constructor(props) {
    super(props);

    this.deleteKeyword = this.deleteKeyword.bind(this);
    this.deleteTwitterInfluencer = this.deleteTwitterInfluencer.bind(this);
    this.deleteIgInstagramfluencer = this.deleteIgInstagramfluencer.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
    this.addTwitterInfluencer = this.addTwitterInfluencer.bind(this);
    this.addIgInstagramfluencer = this.addIgInstagramfluencer.bind(this);
  }

  prepareGroupForUpdate(twInfluencers, igInfluencers, keywords) {
    const twitterMatchGroup = {
      name: this.props.name,
      influencers: twInfluencers,
      keywords,
    };

    const instagramMatchGroup = Object.assign({}, twitterMatchGroup, {
      influencers: igInfluencers,
    });

    return {
      twitterMatchGroup,
      instagramMatchGroup
    }
  }

  deleteKeyword(index) {
    const keywords = this.props.keywords.map(a => a);
    keywords.splice(index, 1);
    const group = this.prepareGroupForUpdate(
      this.props.twInfluencers,
      this.props.igInfluencers,
      keywords
    );

    this.props.updateGroups(group, this.props.groupIndex);
  }

  deleteTwitterInfluencer(index) {
    const twitterFluencer = this.props.twInfluencers.map(a => a);
    twitterFluencer.splice(index, 1);
    const group = this.prepareGroupForUpdate(
      twitterFluencer,
      this.props.igInfluencers,
      this.props.keywords
    );

    this.props.updateGroups(group, this.props.groupIndex);
  }

  deleteIgInstagramfluencer(index) {
    const instagramFluencer = this.props.igInfluencers.map(a => a);
    instagramFluencer.splice(index, 1);
    const group = this.prepareGroupForUpdate(
      this.props.twInfluencers,
      instagramFluencer,
      this.props.keywords
    );

    this.props.updateGroups(group, this.props.groupIndex);
  }

  addKeyword(keyword) {
    const keywords = this.props.keywords.map(a => a);
    keywords.push(keyword);
    const group = this.prepareGroupForUpdate(
      this.props.twInfluencers,
      this.props.igInfluencers,
      keywords
    );

    this.props.updateGroups(group, this.props.groupIndex);
  }

  addTwitterInfluencer(keyword) {
    const twitterFluencer = this.props.twInfluencers.map(a => a);
    twitterFluencer.push(keyword);
    const group = this.prepareGroupForUpdate(
      twitterFluencer,
      this.props.igInfluencers,
      this.props.keywords
    );

    this.props.updateGroups(group, this.props.groupIndex);
  }

  addIgInstagramfluencer(keyword) {
    const instagramFluencer = this.props.igInfluencers.map(a => a);
    instagramFluencer.push(keyword);
    const group = this.prepareGroupForUpdate(
      this.props.twInfluencers,
      instagramFluencer,
      this.props.keywords
    );

    this.props.updateGroups(group, this.props.groupIndex);
  }

  render() {
    const { keywords, twInfluencers, igInfluencers } = this.props;

    return (
      <div style={styles}>
        <KeywordPaperElement keywords={twInfluencers}
                             deleteKeyword={this.deleteTwitterInfluencer}
                             addKeyword={this.addTwitterInfluencer}
                             subheader="Twitter Influencers"
                             inputHint="Add new Twitter influencer" />
        <KeywordPaperElement keywords={igInfluencers}
                             deleteKeyword={this.deleteIgInstagramfluencer}
                             addKeyword={this.addIgInstagramfluencer}
                             subheader="Instagram Influencers"
                             inputHint="Add new Instagram influencer" />
        <KeywordPaperElement keywords={keywords}
                             deleteKeyword={this.deleteKeyword}
                             addKeyword={this.addKeyword}
                             subheader="Keywords"
                             inputHint="Add new keyword" />
      </div>
    );
  }
}

GroupListElement.defaultProps = {
  keywords: [],
  twInfluencers: [],
  igInfluencers: [],
};

GroupListElement.propTypes = {
  name: PropTypes.string.isRequired,
  groupIndex: PropTypes.number.isRequired,
  keywords: PropTypes.array.isRequired,
  twInfluencers: PropTypes.array.isRequired,
  igInfluencers: PropTypes.array.isRequired,
  updateGroups: PropTypes.func.isRequired,
};

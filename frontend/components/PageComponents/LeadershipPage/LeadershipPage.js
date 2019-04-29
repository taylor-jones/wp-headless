import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PersonCard from '../../PersonCard/PersonCard';
import css from './LeadershipPage.scss';


class LeadershipPage extends PureComponent {
  render() {
    const { post } = this.props;
    const { acf } = post;
    // const { people } = acf;
    const { people } = post;

    // console.log(people);
    console.log(post);

    return (
      <div className={css.TeamContainer}>
        <div className={css.TeamWrapper}>
          <div className={css.Team}>
            {people.map((person, index) => {
              return <PersonCard key={index} person={person} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}


LeadershipPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LeadershipPage;

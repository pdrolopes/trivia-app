import React, { ReactElement } from 'react';
import styles from './questionLevel.module.scss';
import { ReactComponent as Star } from './star.svg';
import { Difficulty } from 'service/opentdb';
import classNames from 'classnames/bind';

//TODO Add style, neutral and primary
type Props = {
  level: Difficulty;
};

export default function QuestionLevel(props: Props): ReactElement {
  const { level } = props;
  const label = levelLabel(level);
  const cx = classNames.bind(styles);

  const starMediumDisable = level === 'easy';
  const starHardDisable = level === 'easy' || level === 'medium';

  return (
    <div className={styles.container}>
      <div className={styles.stars}>
        <Star />
        <Star className={cx({ starDisabled: starMediumDisable })} />
        <Star className={cx({ starDisabled: starHardDisable })} />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

const levelLabel = (level: Difficulty) => {
  switch (level) {
    case 'easy':
      return 'Fácil';
    case 'medium':
      return 'Médio';
    case 'hard':
      return 'Difícil';
  }
};

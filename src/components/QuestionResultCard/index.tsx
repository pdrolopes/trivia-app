import React, { ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { ReactComponent as GreenCheck } from './greenCheck.svg';
import { ReactComponent as RedCross } from './redCross.svg';

type Props = {
  correct: boolean;
};
const cx = classNames.bind(styles);

export default function PageLayout(props: Props): ReactElement {
  const { correct } = props;
  const label = correct ? 'Você acertou!' : 'Você errou!';

  return (
    <div className={cx('container', { wrong: !correct })}>
      {correct ? <GreenCheck /> : <RedCross />}
      <span>{label}</span>
    </div>
  );
}

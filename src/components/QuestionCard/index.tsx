import React, { ReactElement } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

type Props = {
  description: string;
  selected: boolean;
  onClick?(): void;
  className?: string;
};

export default function QuestionCard(props: Props): ReactElement {
  const { description, selected, onClick, className } = props;
  const cx = classNames.bind(styles);
  return (
    <span className={cx('content', { selected }, className)} onClick={onClick}>
      {description}
    </span>
  );
}

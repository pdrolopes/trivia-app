import React, { ReactElement } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

type Props = {
  description: string;
  selected: boolean;
  onClick?(): void;
  className?: string;
  'data-testid': string;
};

export default function AnswerCard(props: Props): ReactElement {
  const {
    description,
    selected,
    onClick,
    className,
    'data-testid': dataTestId,
  } = props;
  const cx = classNames.bind(styles);
  return (
    <span
      data-testid={dataTestId}
      className={cx('content', { selected }, className)}
      onClick={onClick}
    >
      {description}
    </span>
  );
}

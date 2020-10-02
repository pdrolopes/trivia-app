import React, { ReactElement } from 'react';
import Header from 'components/Header';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

type Props = {
  title: string;
  className?: string;
  children:
    | Array<ReactElement | undefined | boolean | null>
    | ReactElement
    | undefined;
};

const cx = classNames.bind(styles);

export default function PageLayout(props: Props): ReactElement {
  const { title, children, className = '' } = props;
  return (
    <div className={cx('main', className)}>
      <Header title={title} />
      <div className={styles.children}>{children}</div>
    </div>
  );
}

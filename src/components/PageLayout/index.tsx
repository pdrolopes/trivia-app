import React, { ReactElement } from 'react';
import Header from 'components/Header';
import styles from './styles.module.scss';

type Props = {
  title: string;
  className?: string;
  children:
    | Array<ReactElement | undefined | boolean | null>
    | ReactElement
    | undefined;
};

export default function PageLayout(props: Props): ReactElement {
  const { title, children, className = '' } = props;
  return (
    <div className={`${styles.main} ${className}`}>
      <Header title={title} />
      <div className={styles.children}>{children}</div>
    </div>
  );
}

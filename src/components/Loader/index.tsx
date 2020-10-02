import React, { ReactElement } from 'react';
import styles from './style.module.scss';

type Props = {
  className: string;
  'data-testid'?: string;
};

export default function Loader(props: Props): ReactElement {
  return (
    <div
      data-testid={props['data-testid']}
      className={`${styles.loader} ${props.className}`}
    />
  );
}

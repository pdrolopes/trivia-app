import React, { ReactElement } from "react";
import styles from "./header.module.scss";

//TODO Add style, neutral and primary
type Props = {
  title: string;
};

export default function Header(props: Props): ReactElement {
  const { title } = props;
  return (
    <div className={styles.container}>
      <span>{title}</span>
    </div>
  );
}

import React, { ReactElement } from "react";
import Header from "components/Header";
import styles from "./styles.module.scss";

type Props = {
  title: string;
  children:
    | Array<ReactElement | undefined | boolean | null>
    | ReactElement
    | undefined;
};

export default function PageLayout(props: Props): ReactElement {
  const { title, children } = props;
  return (
    <div className={styles.main}>
      <Header title={title} />
      <div className={styles.children}>{children}</div>
    </div>
  );
}

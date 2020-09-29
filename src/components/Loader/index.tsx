import React, { ReactElement } from "react";
import styles from "./style.module.scss";

type Props = {
  className: string;
};

export default function Loader(props: Props): ReactElement {
  return <div className={`${styles.loader} ${props.className}`} />;
}

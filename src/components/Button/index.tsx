import React, { ReactElement } from "react";
import styles from "./styles.module.scss";

//TODO Add style, neutral and primary
type Props = {
  primary?: boolean;
  secundary?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default function Button(props: Props): ReactElement {
  const { className, ...rest } = props;
  return <button className={`${styles.secondary} ${className}`} {...rest} />;
}

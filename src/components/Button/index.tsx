import React, { ReactElement } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames/bind";

//TODO Add style, neutral and primary
type Props = {
  primary?: boolean;
  secundary?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const cx = classNames.bind(styles);

export default function Button(props: Props): ReactElement {
  const { className, secundary, primary, ...rest } = props;
  return (
    <button
      className={cx(className, "base", {
        secundary: secundary,
        primary: primary,
      })}
      {...rest}
    />
  );
}

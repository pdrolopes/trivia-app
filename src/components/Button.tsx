import React, { ReactElement } from "react";

//TODO Add style, neutral and primary
type Props = {
  primary?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export default function Button(props: Props): ReactElement {
  const { ...rest } = props;
  return <button {...rest} />;
}

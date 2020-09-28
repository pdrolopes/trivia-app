import React, { ReactElement, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { useAppDispatch, useAppSelector } from "store";
import { loadCategories } from "store/categories";

export default function Exam(props: RouteComponentProps): ReactElement {
  const dispatch = useAppDispatch();
  /* const categories = useAppSelector((state) => state.categories.items); */

  /* useEffect(() => { */
  /*   if (categories === undefined) { */
  /*     dispatch(loadCategories()); */
  /*   } */
  /* }, [categories]); */
  return <div>aaaaaaaaaaaaaaaaaaaaaaaaa</div>;
}

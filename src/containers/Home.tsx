import React, { ReactElement, useEffect } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { useAppDispatch, useAppSelector } from "store";
import { loadCategories } from "store/categories";
import Button from "components/Button";
import Header from "components/Header";

export default function Home(props: RouteComponentProps): ReactElement {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);

  useEffect(() => {
    if (categories === undefined) {
      dispatch(loadCategories());
    }
  }, [categories]);

  return (
    <div>
      <Header title="Dev mobile" />
      <h1>Categorias</h1>
      {categories &&
        categories.map((category, index) => (
          <Button key={index} onClick={() => navigate(`/exam/${category.id}`)}>
            {category.name}
          </Button>
        ))}
    </div>
  );
}

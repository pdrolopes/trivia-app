import React, { ReactElement } from "react";
import { navigate } from "@reach/router";
import Button from "components/Button";
import Loader from "components/Loader";
import { Category } from "service/opentdb";
import PageLayout from "components/PageLayout";
import styles from "./styles.module.scss";

type Props = {
  categories: Array<Category>;
  loading: boolean;
  error: boolean;
  onCategorySelect(selected: Category): void;
};

export default function HomeTemplate(props: Props): ReactElement {
  const { categories, loading } = props;

  return (
    <PageLayout title="Dev mobile">
      <div className={styles.content}>
        <h1 className={styles.title}>Categorias</h1>
        <div className={styles.list}>
          {loading && <Loader className={styles.loader} />}
          {categories.map((category, index) => (
            <Button
              className={styles.categoryButton}
              secundary
              key={index}
              onClick={() => navigate(`/exam/${category.id}`)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

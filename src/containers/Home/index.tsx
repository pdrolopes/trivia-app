import React, { ReactElement, useEffect } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { useAppDispatch, useAppSelector } from 'store';
import { loadCategories } from 'store/categories';
import HomeTemplate from './components/HomeTemplate';

export default function Home(_: RouteComponentProps): ReactElement {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);
  const loading = useAppSelector((state) => state.categories.loading);

  useEffect(() => {
    if (categories === undefined) {
      dispatch(loadCategories());
    }
  }, [dispatch, categories]);

  return (
    <HomeTemplate
      categories={categories || []}
      loading={loading}
      error={false}
      onCategorySelect={(category) => navigate(`/exam/${category.id}`)}
    />
  );
}

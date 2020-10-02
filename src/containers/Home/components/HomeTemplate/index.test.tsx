import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import HomeTemplate from './index';
import { Category } from 'service/opentdb';

function setup(categories: Category[], loading = false, onSelect = jest.fn()) {
  return render(
    <HomeTemplate
      categories={categories}
      error={false}
      loading={loading}
      onCategorySelect={onSelect}
    />
  );
}

test('Should show categories and callback when clicked', async () => {
  const onCategoryClickFn = jest.fn();
  const { getByText } = setup(
    [
      { name: 'foo', id: 10 },
      { name: 'bar', id: 11 },
    ],
    false,
    onCategoryClickFn
  );

  const foo = getByText('foo');
  expect(foo).toBeInTheDocument();
  expect(getByText('bar')).toBeInTheDocument();
  fireEvent.click(foo);

  await waitFor(() => expect(onCategoryClickFn).toBeCalledTimes(1));
});

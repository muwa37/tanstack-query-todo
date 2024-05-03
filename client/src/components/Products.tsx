import { Fragment, useState } from 'react';
import { useProduct, useProducts } from '../services/queries';

export default function Products() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const productsQuery = useProducts();
  const productQuery = useProduct(selectedProductId);

  return (
    <>
      {productsQuery.data?.pages.map((group, ind) => (
        <>
          <Fragment key={ind}>
            {group.map(product => (
              <Fragment key={product.id}>
                <button onClick={() => setSelectedProductId(product.id)}>
                  {product.name}
                </button>
              </Fragment>
            ))}
          </Fragment>
          <div>
            <button
              onClick={() => productsQuery.fetchNextPage()}
              disabled={
                !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
              }
            >
              {productsQuery.isFetchingNextPage
                ? 'loading more...'
                : productsQuery.hasNextPage
                ? 'load more'
                : 'nothing more to show'}
            </button>
          </div>
          <div>
            selected product:
            <strong>{JSON.stringify(productQuery.data)}</strong>
          </div>
        </>
      ))}
    </>
  );
}

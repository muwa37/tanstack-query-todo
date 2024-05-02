import { Fragment, useState } from 'react';
import { useProducts } from '../services/queries';

export default function Products() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const productQuery = useProducts();

  return (
    <>
      {productQuery.data?.pages.map((group, ind) => (
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
              onClick={() => productQuery.fetchNextPage()}
              disabled={
                !productQuery.hasNextPage || productQuery.isFetchingNextPage
              }
            >
              {productQuery.isFetchingNextPage
                ? 'loading more...'
                : productQuery.hasNextPage
                ? 'load more'
                : 'nothing more to show'}
            </button>
          </div>
        </>
      ))}
    </>
  );
}

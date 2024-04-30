import { useTodosIds } from '../services/queries';

export default function Todo() {
  const todoIdsQuery = useTodosIds();

  if (todoIdsQuery.isPending) {
    return <span>loading...</span>;
  }

  if (todoIdsQuery.isError) {
    return <span>some error ocurred..</span>;
  }

  return (
    <>
      <p>Query status: {todoIdsQuery.fetchStatus}</p>
      {todoIdsQuery.data.map(id => (
        <p key={id}>{id}</p>
      ))}
    </>
  );
}

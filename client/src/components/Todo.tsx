import { useIsFetching } from '@tanstack/react-query';
import { useTodos, useTodosIds } from '../services/queries';

export default function Todo() {
  const todoIdsQuery = useTodosIds();
  const todosQueries = useTodos(todoIdsQuery.data);

  const isFetching = useIsFetching();

  return (
    <>
      <div>
        <p>Query fn status: {todoIdsQuery.fetchStatus}</p>
        <p>Query data status: {todoIdsQuery.status}</p>
        <p>Global fetching fn: {isFetching}</p>
      </div>
      <ul>
        {todoIdsQuery.data?.map(id => (
          <li key={id}>id: {id}</li>
        ))}
      </ul>
      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>
              id: {data?.id}
              <div>
                <span>
                  <strong>title:</strong> {data?.title}
                </span>
                <span>
                  <strong>description:</strong> {data?.description}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

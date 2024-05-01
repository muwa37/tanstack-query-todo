import { useIsFetching } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateTodo } from '../services/mutation';
import { useTodos, useTodosIds } from '../services/queries';
import { Todo } from '../types/todo';

export default function Todos() {
  const todoIdsQuery = useTodosIds();
  const todosQueries = useTodos(todoIdsQuery.data);
  const createTodoMutation = useCreateTodo();
  const isFetching = useIsFetching();

  const { register, handleSubmit } = useForm<Todo>();

  const onCreateTodoSubmitHandler: SubmitHandler<Todo> = data => {
    createTodoMutation.mutate(data);
  };

  return (
    <>
      <div>
        <p>Query fn status: {todoIdsQuery.fetchStatus}</p>
        <p>Query data status: {todoIdsQuery.status}</p>
        <p>Global fetching fn: {isFetching}</p>
      </div>
      <form onSubmit={handleSubmit(onCreateTodoSubmitHandler)}>
        <h3>new todo</h3>
        <input placeholder='title' {...register('title')} />
        <br />
        <input placeholder='description' {...register('description')} />
        <br />
        <input type='submit' />
      </form>
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

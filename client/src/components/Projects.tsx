import { useState } from 'react';
import { useProjects } from '../services/queries';

export default function Projects() {
  const [page, setPage] = useState(1);

  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProjects(page);

  return (
    <div>
      {isPending ? (
        <span>loading...</span>
      ) : isError ? (
        <span>error: {error.message}</span>
      ) : (
        <ul>
          {data.map(project => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      )}
      <div>
        <span>current page:{page}</span>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 1}
        >
          prev
        </button>
        <button
          onClick={() => {
            if (!isPlaceholderData) {
              setPage(prev => prev + 1);
            }
          }}
          disabled={isPlaceholderData}
        >
          next
        </button>
        {isFetching && <span>loading...</span>}
      </div>
    </div>
  );
}

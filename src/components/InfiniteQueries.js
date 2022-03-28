import React from "react";

import { useInfiniteQuery } from "react-query";

import axios from "axios";
const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueries = () => {
  const {
    isLoading,
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    // isFetching,
    // isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2> Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h2>Infinites</h2>

      {data?.pages.map((group, i) => {
        return (
          <div key={i}>
            {group?.data.map((color) => (
              <h2> {color.label}</h2>
            ))}
          </div>
        );
      })}

      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load More
      </button>
    </div>
  );
};

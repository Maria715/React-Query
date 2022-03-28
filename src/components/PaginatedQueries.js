import React, { useState } from "react";

import { useQuery } from "react-query";

import axios from "axios";
const fetchColors = (pageNumber) => {
  console.log("Page Number", pageNumber);
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export const PaginatedQueries = () => {
  const [pageNumber, setpageNumber] = useState(1);
  const { isLoading, data, isError, error } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2> Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h2>Colors</h2>

      {data?.data.map((color) => {
        return <div key={color.label}>{color.label}</div>;
      })}

      <div>
        <button
          disabled={pageNumber === 1}
          onClick={() => setpageNumber((page) => page - 1)}
        >
          Prev Page
        </button>

        <button
          disabled={pageNumber === 4}
          onClick={() => setpageNumber((page) => page + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

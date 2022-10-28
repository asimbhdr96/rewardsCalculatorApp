import React, { useState, useMemo } from "react";
//custom hook for pagination
const usePagination = (data, volume) => {
  const [page, setPage] = useState(0);
  const totalPages = useMemo(() => Math.ceil(data.length / volume), [data]);
  const slicedData = useMemo(() => {
    if (data.length <= 1) {
      return data;
    } else {
      return data.slice(page * volume, page * volume + volume);
    }
  }, [volume, page, data]);

  return { data: slicedData, page, totalPages, setPage };
};

export default usePagination;

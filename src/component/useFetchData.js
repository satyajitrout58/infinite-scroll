import React, { useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async (page = 0) => {
    setLoading(true);
    const url = `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`;
    const res = await fetch(url);
    const data = await res.json();
    await delay(1000);
    setData(data.data);
    setLoading(false);
  };

  return { data, fetchData, loading };
};

export default useFetchData;

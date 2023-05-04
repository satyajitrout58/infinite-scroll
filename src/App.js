import React, { useEffect, useState, useRef, useCallback } from "react";
import useFetchData from "./component/useFetchData";
import "./styles.css";
let page = 0;

export default function App() {
  const [data, setData] = useState([]);
  const { data: newData, fetchData, loading } = useFetchData();
  const observer = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData([...data, ...newData]);
  }, [newData]);

  const lastData = useCallback((node) => {
    if (!node) return;
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData(page++);
      }
    });
    console.log(observer);
    observer.current.observe(node);
  });

  return (
    <>
      <div className="App">
        {data.map((val, index) => {
          return (
            <div
              className="items"
              key={val.id}
              ref={index === data.length - 1 ? lastData : null}
            >
              <div className="itemData">
                {val.name}
                <p>{index + 1}</p>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <div style={{ backgroundColor: "red" }}>LOADING...</div>}
    </>
  );
}

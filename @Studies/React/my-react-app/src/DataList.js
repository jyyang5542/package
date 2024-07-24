import React, { useState, useEffect } from 'react';
import DataItem from './DataItem';
import './DataList.css'; // 스타일링을 위한 CSS 파일

function DataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API 호출 함수
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL || 'http://localhost:3001/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>; // 로딩 스피너 추가
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map(item => (
          <DataItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default DataList;

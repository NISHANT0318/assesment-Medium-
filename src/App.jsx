import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (pageNum) => {
    setLoading(true);
    setError('');
    setEmpty(false);

    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNum}&order=Desc`
      );
      const result = await response.json();

      if (result.length === 0) {
        setEmpty(true);
      } else {
        setData(result);
      }
    } catch (error) {
      setError('Failed to fetch data');
    }

    setLoading(false);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      fetchData(page - 1);
    }
  };

  return (
    <div className="container">
      <h1>Cat Gallery</h1>
      <button onClick={() => fetchData(page)}>Fetch Cat Images</button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {empty && <p className="empty">No data available</p>}

      <div className="grid">
        {data.map((item) => (
          <div key={item.id} className="card">
            <img src={item.url} alt="cat" />
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="button"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} className="button">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

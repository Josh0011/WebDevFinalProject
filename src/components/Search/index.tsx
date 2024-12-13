import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

interface Club {
  tag: string;
  name: string;
  description: string;
  trophies: number;
  memberCount: number;
  badgeId: number;
}

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const query = searchParams.get("criteria");

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchClubs(query);
    }
  }, [query]);

  const fetchClubs = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.brawlstars.com/v1/clubs?search=${query}`,
        {
          headers: {
            Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjMwOGIyMzc4LTc3NDctNDk1MC1hY2IwLTk5Mjk1N2ZiNDNiNSIsImlhdCI6MTczNDA4NDUyNSwic3ViIjoiZGV2ZWxvcGVyL2VjMTZhYWRlLTNjZTgtZTliNS0yZmU0LTUwYjRjNWFjOTYyNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzEuNTkuNzAuMTYxIl0sInR5cGUiOiJjbGllbnQifV19.EGMsuJfMOel898XqrMNoB2qd96jsJ0fmu-vAdVf2J5_2_Ihj-bbqu7zPHsm1l8DQG9Kr4O_Vpj5K8UUab34RQw", // Replace with your API key
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch clubs. Please try again.");
      }
      const data = await response.json();
      setClubs(data.items); 
      setLoading(false);
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  if (!query) {
    return <div className="text-center mt-5">Search for clubs using the bar above!</div>;
  }

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Search Results</h1>
      {clubs.length === 0 ? (
        <p className="text-center">No clubs found for "{query}".</p>
      ) : (
        <div className="row">
          {clubs.map((club) => (
            <div key={club.tag} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{club.name}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {club.description || "No description provided."}
                  </p>
                  <p className="card-text">
                    <strong>Trophies:</strong> {club.trophies}
                  </p>
                  <p className="card-text">
                    <strong>Members:</strong> {club.memberCount}
                  </p>
                  <Link to={`/clubs/${club.tag}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

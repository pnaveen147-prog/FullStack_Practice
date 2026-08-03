import {useEffect, useState} from "react";
import api from "./api/axios";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>{
    const checkServer = async () => {
      try{
        const response = await api.get("/health");
        setMessage(response.data.message);
      } catch (err) {
        setError("Failed to check server status");
      }
    };

    checkServer();
  }, []);

  return (
    <div>
      <h1>Task Flow</h1>
      {message && <p>{message}</p>}
      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  );
}

export default App;
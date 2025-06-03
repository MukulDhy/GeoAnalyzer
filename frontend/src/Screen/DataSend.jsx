import React, { useState } from 'react';
import axios from 'axios';

const DataSend = () => {
  const [postData, setPostData] = useState('');
  const [response, setResponse] = useState('');

  const handlePostData = async () => {
    try {
      const response = await axios.post('http://localhost:6969/api/test/message1', { data: postData });
      setResponse(response.data.message);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h1>React Express Demo</h1>
      <div>
        <label>Data to Post:</label>
        <input type="text" value={postData} onChange={(e) => setPostData(e.target.value)} />
      </div>
      <button onClick={handlePostData}>Post Data</button>
      <div>Server Response: {response}</div>
    </div>
  );
};

export default DataSend;

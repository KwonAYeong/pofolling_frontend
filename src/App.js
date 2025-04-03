import React, { useEffect } from 'react';
import axios from './api/axios';

function App() {
  useEffect(() => {
    axios.get('/api/test')
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return <div>React ↔ Spring Boot 연결 테스트 중!</div>;
}

export default App;

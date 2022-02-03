import axios from 'axios';
import React from 'react';

const baseURL = 'http://localhost:4000/';
const main = () => {
  const strWindowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
  async function kakao() {
    const result = await axios({
      method: 'get',
      baseURL: baseURL,
      url: `user/kakao`,
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    console.log(result);
    return window.open(result.data, 'name', strWindowFeatures);
  }

  return (
    <div className="hello">
      <h1 style={{ color: 'red' }}>hello</h1>
      <button onClick={() => kakao()}>kakao</button>
    </div>
  );
};

export default main;

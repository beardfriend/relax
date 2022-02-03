import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

type LocationState = {
  html: string;
};
const kakao = () => {
  const location = useLocation();
  const { html } = location.state as LocationState;
  console.log(html);
  return (
    <>
      <Helmet>
        <base href="https://accounts.kakao.com/" />
      </Helmet>
      <div dangerouslySetInnerHTML={{ __html: html }} />;
    </>
  );
};

export default kakao;

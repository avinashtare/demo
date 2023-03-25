import React, { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    return () => {
      document.title = ("About | iNotebook");
    }
  }, [])
  return (
    <>
      <div className="about">
        <h1>This is About </h1>
      </div>
    </>
  );
};

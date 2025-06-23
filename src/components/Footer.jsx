import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    fetch('https://f9qw6hmni6.execute-api.ap-south-1.amazonaws.com/Prod/visit/')
      .then(response => response.json())
      .then(data => setViews(data.views))
      .catch(error => {
        console.error('Error fetching page views:', error);
        setViews('N/A');
      });
  }, []);

  return (
    <footer className="footer">
      <p>Designed and developed by Naveen</p>
      <p>Page views: <span id="view-counter">{views !== null ? views : '...'}</span></p>
    </footer>
  );
};

export default Footer;
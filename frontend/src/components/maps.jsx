import React from 'react';
import { useLocation } from 'react-router-dom';

const Maps = () => {
  const location = useLocation();
  const { adminKey } = location.state || {};

  return (
    <div>
      <h1>Maps Component</h1>
      {/* You can use the adminKey here if needed */}
      {adminKey && <p>Admin Key: {adminKey}</p>}
    </div>
  );
};

export default Maps;
import React from 'react';
import Feeds from '../components/Feeds';

const FavoritePage = () => {
  return (
    <div>
    
      <div>
        <Feeds isFavorite={true} />
      </div>
    </div>
  );
};

export default FavoritePage;

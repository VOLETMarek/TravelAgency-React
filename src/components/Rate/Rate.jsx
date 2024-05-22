import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Rate = ({ rate }) => {
  return (
    <div className='flex justify-end py-3'>
      <ReactStars
        count={5}
        value={rate}
        edit={false}
        size={24}
        activeColor="#ffd700"
      />
    </div>
  );
};

export default Rate;

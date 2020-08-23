import React, { memo } from 'react';

const Resume: React.FC<any> = props => {
  console.log('props', props);
  return (
    <div> i am resume</div>
  );
};

export default memo(Resume);
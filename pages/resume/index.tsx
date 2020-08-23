import React, { memo } from 'react';
import Layout from '@/components/Layout';

import './style.less';

const Resume: React.FC<any> = props => {
  console.log('props', props);
  return (
    <Layout>
      <div className="resume-wrapper"> i am resume</div>
    </Layout>
  );
};

export default memo(Resume);
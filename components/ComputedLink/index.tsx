import React, { memo } from 'react';
import { useRouter } from 'next/router';

import './style.less';

const ComputedLink: React.FC<any> = ({ children, href }) => {
  const router = useRouter();
  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    await router.push(href);
  };
  return (
    <a href={href} onClick={handleLinkClick}>
      {children}
    </a>
  );
};

export default memo(ComputedLink);

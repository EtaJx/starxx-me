import React, { memo } from 'react';
import { useRouter } from 'next/router';

import './style.less';

type CompputedLinkProps = {
  children: React.ReactElement;
  href: string;
  key: string;
  style: React.CSSProperties
};

const ComputedLink: React.FC<CompputedLinkProps> = ({ children, href, key, style }) => {
  console.log('href', href);
  const router = useRouter();
  console.log('pathname', router.pathname);
  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    await router.push(href);
  };
  return (
    <a href={href} key={key} style={style} onClick={handleLinkClick} className="link">
      {React.cloneElement(children, {
        isActive: href === router.pathname
      })}
    </a>
  );
};

export default memo(ComputedLink);

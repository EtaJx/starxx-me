import React, { memo } from 'react';
import { useRouter } from 'next/router';

import './style.less';

type CompputedLinkProps = {
  children: React.ReactElement;
  href: string;
  style?: React.CSSProperties
};

const ComputedLink: React.FC<CompputedLinkProps> = ({ children, href, style }) => {
  const router = useRouter();
  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    await router.push(href);
  };
  console.log('href', href, router.pathname);
  return (
    <a href={href} style={style} onClick={handleLinkClick} className="link">
      {React.cloneElement(children, {
        isActive: href === router.pathname
      })}
    </a>
  );
};

export default memo(ComputedLink);

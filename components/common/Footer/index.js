import React from 'react';
import './index.less';
import 'csshake';

const Footer = () => {
  return(
    <div className="hing-div__footer">
      <div className="hing-div__friendlink shake-slow shake-constant shake-constant--hover">
        <span>友情链接:</span>
        <a href="https://www.yodfz.com/" target="_blank">一只会写代码的熊猫</a>
      </div>
      <div className="hing-div__copyright">
        <p>&copy; 2020 starx.me</p>
      </div>
    </div>
  )
};

export default Footer;

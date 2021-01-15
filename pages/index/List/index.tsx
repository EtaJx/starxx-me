import React, { memo } from 'react';
import { folderStructs } from '@/pages/types/list';
import Folder from './Folder';
import './style.less';

type ListDataProps = {
  folderList: folderStructs
}
const List: React.FC<ListDataProps> = props => {
  const { folderList } = props;
  return (
    <div className="list-wrapper">
      {
        folderList.map((folder) => {
          const [key] = folder;
          return (
            <div key={key as string}>
            <Folder folder={folder} />
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(List);

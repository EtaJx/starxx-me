import React, { memo } from 'react';
import { folderStructs } from '@/typings/list';
import Folder from './Folder';
import styles from './style.module.css';

type ListDataProps = {
  folderList: folderStructs
}
const List: React.FC<ListDataProps> = props => {
  const { folderList } = props;
  return (
    <div className={styles['list-wrapper']}>
      {
        folderList && folderList.map((folder) => {
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

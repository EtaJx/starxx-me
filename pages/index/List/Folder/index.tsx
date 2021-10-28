import React, { memo } from 'react';
import { folderIncludeFiles, folderStruct } from '@/typings/list';
import File from '../File';
import styles from './style.module.css';

type FolderProps = {
  folder: folderStruct
};
const Folder: React.FC<FolderProps> = (props) => {
  const { folder = [] } = props;
  const [_, folderFiles = {}] = folder;
  console.log(_); // 防止eslint报错
  const { folderName, files } = folderFiles as folderIncludeFiles;
  return (
    <div className={styles['folder-wrapper']}>
      <h4 className={styles['folder-title']}>{folderName}</h4>
      {
        files && files.map((file) => {
          const { id } = file;
          return (
            <div key={id}>
              <File file={file} />
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(Folder);

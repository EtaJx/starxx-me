import React, { memo, useId } from 'react';
import { folderIncludeFiles, folderStruct } from '@/typings/list';
import File from '../File';
import styles from './style.module.css';

type FolderProps = {
  folder: folderStruct,
  trigger: () => void,
};
const Folder: React.FC<FolderProps> = (props) => {
  const { folder = [], trigger } = props;
  const [folderId, folderFiles = {}] = folder;
  const id = useId();
  const { folderName, files } = folderFiles as folderIncludeFiles;
  return (
    <div className={styles['folder-wrapper']}>
      <h4 className={styles['folder-title']} id={`${id}-${folderId}`}>{folderName}</h4>
      {
        files && files.map((file) => {
          const { id } = file;
          return (
            <div key={id} onClick={trigger}>
              <File file={file} />
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(Folder);

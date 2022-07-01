import React, { memo } from 'react';
import { folderStructs } from '@/typings/list';
import Folder from './Folder';
import styles from './style.module.css';
import useLoading from '@/hooks/useLoading';
import loadingImg from '@/public/loading.svg';

type ListDataProps = {
  folderList: folderStructs
}
const List: React.FC<ListDataProps> = props => {
  const { folderList } = props;
  const { data, events } = useLoading();
  const { loading } = data;
  const { toggleLoading } = events;
  return (
    <div className={styles['list-wrapper']}>
      {
        loading && (
          <div className={styles.loading}>
            <img src={loadingImg.src} className={styles['loading-icon']} />
        </div>
        )
      }
      {
        folderList && folderList.map((folder) => {
          const [key] = folder;
          return (
            <div key={key as string}>
              <Folder folder={folder} trigger={toggleLoading} />
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(List);

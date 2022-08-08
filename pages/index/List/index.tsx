import React, { memo, useId } from 'react';
import { folderStructs } from '@/typings/list';
import Folder from './Folder';
import styles from './style.module.css';
import useLoading from '@/hooks/useLoading';
import Loading from '@/components/Loading';

type ListDataProps = {
  folderList: folderStructs
}
const List: React.FC<ListDataProps> = props => {
  const { folderList } = props;
  const { data, events } = useLoading();
  const { loading } = data;
  const { toggleLoading } = events;
  const wrapperId = useId();
  return (
    <div className={styles['list-wrapper']}>
      {
        loading && <Loading />
      }
      {
        folderList && folderList.map((folder) => {
          const [key] = folder;
          return (
            <div key={key as string} id={`${wrapperId}-${key}`}>
              <Folder folder={folder} trigger={toggleLoading} />
            </div>
          );
        })
      }
    </div>
  );
};

export default memo(List);

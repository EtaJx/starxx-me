import React, { memo } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { file } from '@/typings/list';
import styles from './style.module.css';

type FileProps = {
  file: Partial<file>
}
const File: React.FC<FileProps> = (props) => {
  const { file = {} } = props;
  const { name = '', modifiedTime, id } = file;
  const adjustName = name.replace('.md', '');
  const localTime = moment(modifiedTime).utc().utcOffset(+8).locale('zh-CN').format('llll');
  return (
    <Link href={`/article/${id}`}>
      <div className={styles['file-wrapper']}>
        <span className={styles['file-name']}>{adjustName ?? ''}</span>
        <span className={styles['file-createtime']}>{localTime}</span>
      </div>
    </Link>
  );
};

export default memo(File);

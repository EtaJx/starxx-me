import React from 'react';
import moment from 'moment';
import { Folder, File } from 'typings/list';
import './style/list.less';

type FileProps = {
  files: File[];
};
const FileItem: React.FC<FileProps> = props => {
  const { files } = props;
  return (
    <div className="hing-div__file__item">
      {
        files.map((file: File) => {
          const { name, id, modifiedTime  } = file;
          return (
            <a className="hing-a__list__link" href={`/content?token=${id}`} key={id}>
              <span className="hing-span__title">{name}</span>
              <span className="hing-span__date">{moment(modifiedTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            </a>
          )
        })
      }
    </div>
  )
};


type ListProps = {
  list: Folder[]
};
const List: React.FC<ListProps> = props => {
  const { list } = props
  return (
    <ul className="hing-ul__list__wrapper">
      {
        list.map(item  => {
          const { id, folderName, files, isOpen } = item;
          return (
            <li key={id} className="hing-li__list__item">
              <div className="hing-div__list__item__title">
                <i className="hing-i__folder__icon" />
                <h4>{folderName}</h4>
              </div>
              { isOpen ? <FileItem files={files} /> : null }
            </li>
          )})
      }
    </ul>
  );
}

export default List

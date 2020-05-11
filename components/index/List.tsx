import React from 'react'
import moment from 'moment'
import { ListItem } from 'typings/list';
import './style/list.less'

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

type ListProps = {
  list: ListItem[]
}

const List: React.FC<ListProps> = props => {
  const { list } = props
  return (
    <ul style={listStyle}>
      {
        list.map(item  => {
          const { id, date, title } = item;
          return (
            <li key={id}>
              <a href={`/content?token=${id}`} className="hing-a__list__link">
                <h4>{title} <span style={{
                  fontWeight: 'normal',
                  color: '#999'
                }}>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</span></h4>
              </a>
            </li>
          )})
      }
    </ul>
  );
}

export default List

import React from 'react'
import moment from 'moment'
import './style/list.less'

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

const List = (props) => {
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
                }}>{moment(date).utc().format('YYYY-MM-DD HH:mm:ss')}</span></h4>
                <p></p>
              </a>
            </li>
          )})
      }
    </ul>
  )
}

export default List

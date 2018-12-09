import React, { Component } from 'react'
import moment from 'moment'

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

class List extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { list } = this.props
    return (
      <ul style={listStyle}>
        {
          list.map((item, index) => (
            <li key={index}>
              <h4>{item.title} <span style={{
                fontWeight: 'normal',
                color: '#999'
              }}>{moment(item.date).utc().format('YYYY-MM-DD HH:mm:ss')}</span></h4>
              <p></p>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default List
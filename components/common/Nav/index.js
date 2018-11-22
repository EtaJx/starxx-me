import React, {Component} from 'react'
import './index.less'

class Nav extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <section className="hing-nav">
        <div className="hing-div__nav__avatar">
          <img src="https://pbs.twimg.com/profile_images/1022743906302062592/8pz672JW_400x400.jpg" />
        </div>
      </section>
    )
  }
}

export default Nav
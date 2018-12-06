import Header from './common/Header'
import Nav from './common/Nav'
import { withRouter } from 'next/router'
import '../lib/prism/prism.js'
import '../lib/prism/prism.css'


import './style.less'

const Layout = (props) => {
  return (
    <div className="hing-div__wrapper">
      <Header />
      <Nav />
      {props.children}
    </div>
  )
}

export default withRouter(Layout)
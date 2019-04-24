import React from 'react';
import './style/skill.less';

class Skill extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, val } = this.props.skill;
    return (
      <div className="hing-div__skill">
        <h4>{title}</h4>
        <ul>
          {
            val.map((val, index) => {
              return (<li className="" key={index}>{val}</li>)
            })
          }
        </ul>
      </div>
    )
  }
}

export default Skill;

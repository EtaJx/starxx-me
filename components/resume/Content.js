import React from 'react';
import Skill from './Skill';
import './style/content.less';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { skill, experience = [] } = this.props.resume;
    return (
      <div className="hing-div__intro__wrapper">
        <div className="hing-div__experience">
          <h4>工作经历</h4>
          {
            experience.map((val, index) => {
              return (
                <div className="hing-div__content" key={val.key}>
                  <p><b>{val.company}</b></p>
                  <p>{val.time}</p>
                  {
                    !!val.department && <p>{val.department}</p>
                  }
                  <ul>
                    {
                      (val.projects || []).map((project, key) => (
                        <li key={`pro${key}`} dangerouslySetInnerHTML={{ __html: project }}></li>
                      ))
                    }</ul>
                  <p dangerouslySetInnerHTML={{ __html: val.content }}></p>
                  <div className="hing-div__skills">
                    {
                      (val.skills || []).map((item, index) => {
                        return (<span className="hing-span__skill" key={index}>{item}</span>)
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        <Skill skill={skill} />
      </div>
    )
  }
}

export default Content;

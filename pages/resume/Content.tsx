import React from 'react';
import Skill from './Skill';
import { ContentType } from '@/typings/resume';
import './styles/content.less';

const Content: React.FC<ContentType.Props> = (props) => {
  const { resume = {} } = props;
  const { experience = [], skill = {} } = resume as ContentType.ExperienceResume;
  return (
    <div className="hing-div__intro__wrapper">
      <div className="hing-div__experience">
        <h4>工作经历</h4>
        {
          experience.map((val) => {
            return (
              <div className="hing-div__content" key={val.key}>
                <p><b>{val.company}</b></p>
                <p>{val.time}</p>
                {
                  !!val.department && <p>{val.department}</p>
                }
                <ul>
                  {
                    val.projects.map((project, index) => {
                      return (
                        <li key={`pro${index}`} dangerouslySetInnerHTML={{ __html: project }}/>
                      );
                    })
                  }</ul>
                <p dangerouslySetInnerHTML={{ __html: val.content }} />
                <div className="hing-div__skills">
                  {
                    val.skills?.map((item, index) => {
                      return (<span className="hing-span__skill" key={index}>{item}</span>);
                    })
                  }
                </div>
              </div>
            );
          })
        }
      </div>
      <Skill skill={skill} />
    </div>
  );
};

export default Content;

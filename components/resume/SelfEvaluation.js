import React from 'react';
import './style/selfEvaluation.less';

class SelfEvaluation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hing-div__selfevaluation">
        <h4>自我评价</h4>
        <ul>
          {
            this.props.evaluation.map((val, index) => (
              <li key={index} className="hing-li__evaluation" dangerouslySetInnerHTML={{ __html: val }}></li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default SelfEvaluation;

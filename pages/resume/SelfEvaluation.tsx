import React from 'react';
import { EvaluationType } from '@/typings/resume';
import './styles/selfEvaluation.less';

const SelfEvaluation: React.FC<EvaluationType.Props> = props => {
  const { evaluation } = props;
  return (
    <div className="hing-div__selfevaluation">
      <h4>自我评价</h4>
      <ul>
        {
          evaluation.map((val: string, index: number) => (
            <li key={index} className="hing-li__evaluation" dangerouslySetInnerHTML={{ __html: val }} />
          ))
        }
      </ul>
    </div>
  );
};

export default SelfEvaluation;

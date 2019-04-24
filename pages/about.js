import Layout from 'components/Layout';
import React from 'react';
import Head from 'next/head';
import fetch from 'node-fetch';
import ResumeHeader from 'components/resume/Header';
import ResumeContent from 'components/resume/Content';
import ResumeSelfEvaluation from 'components/resume/SelfEvaluation';

/**
 * getInitialProps can not be used in children components. Only in pages.
 */
class Index extends React.Component {
  static async getInitialProps({ req }) {
    const baseUrl = `http://${req.headers['host']}`;
    const res = await fetch(`${baseUrl}/resume`);
    const { info: { data: { intro, resume, evaluation } } } = await res.json();
    return {
      intro,
      resume,
      evaluation
    };
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.querySelector('.hing-nav').className = 'hing-nav fade-out';
    document.querySelector('.hing-ul__nav__group').className = 'hing-ul__nav__group nav-fade-out';
  }
  render() {
    const { intro = [], style = {}, resume, evaluation } = this.props;
    return (
      <Layout title={'个人简历'}>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
        <ResumeHeader intro={intro} style={style} />
        <ResumeContent resume={resume} />
        <ResumeSelfEvaluation evaluation={evaluation} />
      </Layout>
    )
  }
}

export default Index;
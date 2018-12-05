import Layout from '../components/Layout'
import fetch from 'node-fetch'

const Index = ({ok, articles}) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{__html: articles[0]}}></div>
    </Layout>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:8080/api')
  const json = await res.json()
  return {
    ok: json.ok,
    articles: json.articles
  }
}

export default Index
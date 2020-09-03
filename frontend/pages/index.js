import Layout from '../components/Layout'
import Link from 'next/link'

const Index = () => {
  return (
    <Layout>
      <h2>Blogs</h2>
      <Link href='/blogs'>
        <a>blogs</a>
      </Link>
    </Layout>
  )
}

export default Index

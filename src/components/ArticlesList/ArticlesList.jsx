import React, { useState, useEffect } from 'react'
import { Pagination, ConfigProvider } from 'antd'

import Article from '../Article'
import getArticles from '../../services/getArticles'
import Loading from '../Loading'
import Error from '../Error'

import styles from './ArticlesList.module.scss'

const customTheme = {
  token: {
    colorPrimary: '#FFFFFF',
    colorBgContainer: '#1890ff',
    borderRadius: 4,
    colorText: '#000000BF',
    fontSize: 12,
  },
}

export default function ArticlesList({ isAuthenticated }) {
  const [articles, setArticles] = useState([])
  const [articlesCount, setArticlesCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const [limit] = useState(5)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setLoading(true)
    getArticles(setArticles, setArticlesCount, setLoading, setError, limit, offset)
  }, [limit, offset])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <>
      <ul className={styles.articlesList}>
        {articles.map((article) => (
          <Article key={article.slug} article={article} isAuthenticated={isAuthenticated} />
        ))}
      </ul>
      <ConfigProvider theme={customTheme}>
        <Pagination
          onChange={(newPage) => {
            setCurrentPage(newPage)
            setOffset((newPage - 1) * limit)
          }}
          current={currentPage}
          defaultCurrent={1}
          defaultPageSize={limit}
          total={articlesCount}
          align='center'
          showSizeChanger={false}
          hideOnSinglePage={true}
          size={'small'}
        />
      </ConfigProvider>
    </>
  )
}

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { message, Popconfirm } from 'antd'
import { HeartTwoTone } from '@ant-design/icons'
import { format } from 'date-fns'

import getArticlePage from '../../services/getArticlePage'
import deleteArticle from '../../services/deleteArticle'
import favoriteArticle from '../../services/favoriteArticle'
import unfavoriteArticle from '../../services/unfavoriteArticle'
import Loading from '../Loading'
import Error from '../Error'

import './ArticlePage.scss'

export default function ArticlePage({ user, isAuthenticated }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLiked, setIsLiked] = useState(article?.favorited)
  const [favoritesCount, setFavoritesCount] = useState(article?.favoritesCount)
  const isAuthor = user?.username === article?.author.username

  useEffect(() => {
    getArticlePage(setArticle, setLoading, setError, slug, setIsLiked, setFavoritesCount)
  }, [])

  const handleLike = () => {
    if (!isAuthenticated) {
      messageApi.open({
        type: 'error',
        content: 'Вы должны быть авторизованы, чтобы ставить лайки.',
      })
      return
    }

    if (isLiked) {
      unfavoriteArticle(setIsLiked, setFavoritesCount, slug)
    } else {
      favoriteArticle(setIsLiked, setFavoritesCount, slug)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className='article'>
      <div className='article__header'>
        <h1 className='article__title'>{article.title}</h1>
        <div className='article__item-likes'>
          {contextHolder}
          <button onClick={handleLike} className='article__item-likes-button'>
            <HeartTwoTone style={{ fontSize: '16px' }} twoToneColor={isLiked ? '#FF0707' : ''} />
          </button>
          <span className='article__item-likes-count'>{favoritesCount}</span>
        </div>
      </div>

      <ul className='article__tags'>
        {article.tagList
          .filter((tag) => tag)
          .map((tag, index) => (
            <li key={index} className='article__tag'>
              {tag}
            </li>
          ))}
      </ul>

      <div className='article__container'>
        <p className='article__description'>{article.description}</p>
        {isAuthor && (
          <div>
            <Popconfirm
              placement='right'
              description='Are you sure to delete this article?'
              okText='Yes'
              cancelText='No'
              onConfirm={() => deleteArticle(slug, navigate)}
            >
              <button className='article__deleteButton'>Delete</button>
            </Popconfirm>
            <button className='article__editButton' onClick={() => navigate(`/articles/${slug}/edit`)}>
              Edit
            </button>
          </div>
        )}
      </div>

      <ReactMarkdown>{article.body}</ReactMarkdown>

      <div className='article__footer'>
        <img src={article.author.image} alt={article.author.username} className='author__image' />
        <div className='author__details'>
          <div className='author__name'>{article.author.username}</div>
          <div className='author__date'>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</div>
        </div>
      </div>
    </div>
  )
}

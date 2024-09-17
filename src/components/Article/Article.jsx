import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { HeartTwoTone } from '@ant-design/icons'
import { format } from 'date-fns'

import favoriteArticle from '../../services/favoriteArticle'
import unfavoriteArticle from '../../services/unfavoriteArticle'

import './Article.scss'

export default function Article({ article, isAuthenticated }) {
  const [messageApi, contextHolder] = message.useMessage()
  const [isLiked, setIsLiked] = useState(article.favorited)
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount)

  const handleLike = () => {
    if (!isAuthenticated) {
      messageApi.open({
        type: 'error',
        content: 'Вы должны быть авторизованы, чтобы ставить лайки.',
      })
      return
    }

    if (isLiked) {
      unfavoriteArticle(setIsLiked, setFavoritesCount, article.slug)
    } else {
      favoriteArticle(setIsLiked, setFavoritesCount, article.slug)
    }
  }

  return (
    <li className='articles-list__item'>
      <div className='articles-list__item-header'>
        <Link className='articles-list__item-title' to={`/articles/${article.slug}`}>
          {article.title}
        </Link>
        <div className='articles-list__item-likes'>
          {contextHolder}
          <button onClick={handleLike} className='articles-list__item-likes-button'>
            <HeartTwoTone style={{ fontSize: '16px' }} twoToneColor={isLiked ? '#FF0707' : ''} />
          </button>
          <span className='articles-list__item-likes-count'>{favoritesCount}</span>
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
      <p className='article__description'>{article.description}</p>
      <div className='article__footer'>
        <img src={article.author.image} alt={article.author.username} className='author__image' />
        <div className='author__details'>
          <div className='author__name'>{article.author.username}</div>
          <div className='author__date'>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</div>
        </div>
      </div>
    </li>
  )
}

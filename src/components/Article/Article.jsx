import React from "react";
import { Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { format } from "date-fns";

import "./Article.scss";

export default function Article({ article }) {
  return (
    <li className="articles-list__item">
      <div className="articles-list__item-header">
        <Link
          className="articles-list__item-title"
          to={`/articles/${article.slug}`}
        >
          {article.title}
        </Link>
        <div className="articles-list__item-likes">
          <HeartOutlined className="articles-list__item-likes-icon" />
          <span className="articles-list__item-likes-count">
            {article.favoritesCount}
          </span>
        </div>
      </div>
      <ul className="article__tags">
        {article.tagList
          .filter((tag) => tag)
          .map((tag, index) => (
            <li key={index} className="article__tag">
              {tag}
            </li>
          ))}
      </ul>
      <p className="article__description">{article.description}</p>
      <div className="article__footer">
        <img
          src={article.author.image}
          alt={article.author.username}
          className="author__image"
        />
        <div className="author__details">
          <div className="author__name">{article.author.username}</div>
          <div className="author__date">
            {format(new Date(article.createdAt), "MMMM d, yyyy")}
          </div>
        </div>
      </div>
    </li>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Spin } from "antd";
import { HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import { format } from "date-fns";

import getArticle from "../../services/getArticle";

import "./ArticlePage.scss";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticle(setArticle, setLoading, slug);
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <Spin
          className="loading-container"
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      </div>
    );
  }

  return (
    <div className="article">
      <div className="article__header">
        <h1 className="article__title">{article.title}</h1>
        <div className="article__likes">
          <HeartOutlined className="article__likes-icon" />
          <span className="article__likes-count">{article.favoritesCount}</span>
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

      <ReactMarkdown>{article.body}</ReactMarkdown>

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
    </div>
  );
}

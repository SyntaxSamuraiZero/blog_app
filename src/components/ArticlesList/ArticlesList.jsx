import React, { useState, useEffect } from "react";
import { Pagination, Spin, ConfigProvider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Article from "../Article";
import fetchArticles from "../../services/fetchArticles";

import "./ArticlesList.scss";

const customTheme = {
  token: {
    colorPrimary: "#FFFFFF",
    colorBgContainer: "#1890ff",
    borderRadius: 4,
    colorText: "#000000BF",
    fontSize: 12,
  },
};

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState();

  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchArticles(setArticles, setArticlesCount, setLoading, limit, offset);
  }, [limit, offset]);

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
    <>
      <ul className="articles-list">
        {articles.map((article) => (
          <Article key={article.slug} article={article} />
        ))}
      </ul>
      <ConfigProvider theme={customTheme}>
        <Pagination
          onChange={(newPage) => {
            setOffset((newPage - 1) * limit);
          }}
          defaultCurrent={1}
          defaultPageSize={limit}
          total={articlesCount}
          align="center"
          showSizeChanger={false}
          hideOnSinglePage={true}
          size={"small"}
        />
      </ConfigProvider>
    </>
  );
}

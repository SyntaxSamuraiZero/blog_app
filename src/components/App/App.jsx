import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../Header";
import ArticlesList from "../ArticlesList";
import ArticlePage from "../ArticlePage";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

import "./App.scss";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

/*Корневой URL для API: https://blog.kata.academy/api/

1. Реализуйте страницу со списком статей
2. Сделайте пагинацию. Пагинация статей должна быть на стороне сервера - при смене 
страницы отправляем новый запрос. Не забываем индикаторы загрузки и обработку ошибок.
3. Реализуйте страницу одной статьи. Обратите внимание, что полный текст статьи - это 
Markdown разметка, найдите подходящий модуль для вывода содержимого на экран.

Используйте react-router для навигации по страницам.

Страницы:

/ и /articles - список всех статей. При клике на заголовок - переход 
на страницу статьи. Кнопка лайка не активна, т.к. мы не авторизованы.

/articles/{slug} - Просмотр статьи с полным текстом.*/

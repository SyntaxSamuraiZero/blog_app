import { message } from "antd";

export default async function handleSubmits(
  setIsLiked,
  setFavoritesCount,
  slug
) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка.");
    }

    const data = await response.json();
    setIsLiked(data.article.favorited);
    setFavoritesCount(data.article.favoritesCount);
  } catch (error) {
    message.error(error.message);
  }
}

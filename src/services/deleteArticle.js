import { message } from "antd";

export default async function deleteArticle(slug, navigate) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка удаления статьи.");
    }

    message.success("Статья удалена.", 2);
    navigate("/");
  } catch (error) {
    message.error(error.message);
  }
}

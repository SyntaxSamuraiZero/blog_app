import { message } from "antd";

export default async function updateArticle(formData, slug) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка.");
    }

    message.success("Статья обновлена.", 2);
  } catch (error) {
    message.error(error.message);
  }
}

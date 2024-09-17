import { message } from "antd";

export default async function handleSubmits(formData, navigate) {
  const hide = message.loading("Загрузка данных...", 0);
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch("https://blog.kata.academy/api/articles", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Ошибка. Пост не отправлен.");
    }

    hide();
    message.success("Пост добавлен.", 2);
    navigate("/");
  } catch (error) {
    hide();
    message.error(error.message);
  }
}

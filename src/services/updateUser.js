import { message } from "antd";

export default async function updateUser(formData, setUser) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch("https://blog.kata.academy/api/user", {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Такой логин или почта уже заняты.");
    }

    const data = await response.json();
    setUser(data.user);
    message.success("Профиль обновлён.", 2);
  } catch (error) {
    message.error(error.message);
  }
}

import { message } from "antd";

export default async function handleLogin(
  formData,
  setUser,
  setIsAuthenticated,
  navigate
) {
  const hide = message.loading("Загрузка...", 0);

  try {
    const response = await fetch("https://blog.kata.academy/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Неправильный логин или пароль.");
    }

    const data = await response.json();
    setUser(data.user);
    localStorage.setItem("authToken", data.user.token);
    setIsAuthenticated(true);
    hide();
    navigate("/");
  } catch (error) {
    hide();
    message.error(error.message);
  }
}

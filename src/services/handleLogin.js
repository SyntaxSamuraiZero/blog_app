export default async function handleLogin(formData, setError) {
  try {
    const response = await fetch("https://blog.kata.academy/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const result = await response.json();
    localStorage.setItem("authToken", result.user.token);
    setError(null);
  } catch (error) {
    setError(error.message);
  }
}

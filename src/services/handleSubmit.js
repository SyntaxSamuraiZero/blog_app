export default async function handleSubmit(event) {
  event.preventDefault();

  const data = {
    user: {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    },
  };

  console.log("Sending data:", JSON.stringify(data));

  try {
    const response = await fetch("https://blog.kata.academy/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Success:", result);
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

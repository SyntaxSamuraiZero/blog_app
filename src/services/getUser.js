export default async function getUser(setUser, setLoading, setError) {
  try {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`https://blog.kata.academy/api/user`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    setUser(data.user)
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

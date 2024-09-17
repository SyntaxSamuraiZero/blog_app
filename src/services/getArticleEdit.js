export default async function getArticleEdit(setArticle, setLoading, setError, slug) {
  const token = localStorage.getItem('authToken')

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    setArticle(data.article)
  } catch (error) {
    setError(error)
  } finally {
    setLoading(false)
  }
}

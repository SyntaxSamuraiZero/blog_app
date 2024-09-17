export default async function getArticlePage(setArticle, setLoading, setError, slug, setIsLiked, setFavoritesCount) {
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
    setIsLiked(data.article.favorited)
    setFavoritesCount(data.article.favoritesCount)
  } catch (error) {
    setError(error)
  } finally {
    setLoading(false)
  }
}

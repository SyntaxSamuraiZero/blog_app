export default async function getArticles(
  setArticles,
  setArticlesCount,
  setLoading,
  setError,
  limit,
  offset
) {
  try {
    const response = await fetch(
      `https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setArticles(data.articles);
    setArticlesCount(data.articlesCount);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}

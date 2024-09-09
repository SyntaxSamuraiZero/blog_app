export default async function fetchArticles(
  setArticles,
  setArticlesCount,
  setLoading,
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
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

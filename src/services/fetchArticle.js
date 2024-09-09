export default async function fetchArticle(setArticle, setLoading, slug) {
  try {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setArticle(data.article);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

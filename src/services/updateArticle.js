import { message } from 'antd'

export default async function updateArticle(formData, slug, navigate) {
  const token = localStorage.getItem('authToken')

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Ошибка обновления статьи.')
    }

    message.success('Статья обновлена.')
    navigate(`/articles/${slug}`)
  } catch (error) {
    message.error(error.message)
  }
}

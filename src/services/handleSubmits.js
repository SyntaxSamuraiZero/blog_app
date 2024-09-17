import { message } from 'antd'

export default async function handleSubmits(formData, navigate) {
  const hide = message.loading('Загрузка данных...', 0)

  try {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Такой логин или почта уже заняты.')
    }

    hide()
    message.success('Регистрация прошла успешно!', 1, () => {
      navigate('/sign-in')
    })
  } catch (error) {
    hide()
    message.error(error.message)
  }
}

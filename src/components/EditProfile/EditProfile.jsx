import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import updateUser from '../../services/updateUser'

import styles from './EditProfile.module.scss'

export default function EditProfile({ user, setUser }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      })
    }
  }, [user, reset])

  const onSubmit = async (data) => {
    const formData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
      },
    }

    await updateUser(formData, setUser)
  }

  return (
    <div className={styles.editContainer}>
      <h2 className={styles.editTitle}>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.editField}>
          <label htmlFor='username' className={styles.editLabel}>
            Username
          </label>
          <input
            type='text'
            id='username'
            className={styles.editInput}
            placeholder='Username'
            autoComplete='username'
            autoFocus
            {...register('username', {
              required: '*username is required',
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Username must contain only Latin letters',
              },
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters long',
              },
              maxLength: {
                value: 20,
                message: 'Username cannot exceed 20 characters',
              },
            })}
          />
          {errors.username && <p className={styles.errorText}>{errors.username.message}</p>}
        </div>

        <div className={styles.editField}>
          <label htmlFor='email' className={styles.editLabel}>
            Email address
          </label>
          <input
            type='email'
            id='email'
            className={styles.editInput}
            placeholder='Email address'
            autoComplete='email'
            {...register('email', {
              required: '*email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
        </div>

        <div className={styles.editField}>
          <label htmlFor='password' className={styles.editLabel}>
            New password
          </label>
          <input
            type='password'
            id='password'
            className={styles.editInput}
            placeholder='New password'
            {...register('password', {
              required: '*password is required',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Password cannot exceed 40 characters',
              },
            })}
          />
          {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
        </div>

        <div className={styles.editField}>
          <label htmlFor='image' className={styles.editLabel}>
            Avatar image (url)
          </label>
          <input
            type='url'
            id='image'
            className={styles.editInput}
            placeholder='Avatar image'
            {...register('image', {
              required: '*url is required',
              pattern: {
                value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                message: 'Invalid URL format',
              },
            })}
          />
          {errors.image && <p className={styles.errorText}>{errors.image.message}</p>}
        </div>

        <button type='submit' className={styles.saveButton}>
          Save
        </button>
      </form>
    </div>
  )
}

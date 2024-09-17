import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import handleSubmits from '../../services/handleSubmits'

import styles from './SignUp.module.scss'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const password = watch('password')

  const onSubmit = async (data) => {
    const formData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }

    await handleSubmits(formData, navigate)
  }

  return (
    <div className={styles.regContainer}>
      <h2 className={styles.regTitle}>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.regField}>
          <label htmlFor='username' className={styles.regLabel}>
            Username
          </label>
          <input
            type='text'
            id='username'
            className={styles.regInput}
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

        <div className={styles.regField}>
          <label htmlFor='email' className={styles.regLabel}>
            Email address
          </label>
          <input
            type='email'
            id='email'
            className={styles.regInput}
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

        <div className={styles.regField}>
          <label htmlFor='password' className={styles.regLabel}>
            Password
          </label>
          <input
            type='password'
            id='password'
            className={styles.regInput}
            placeholder='Password'
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

        <div className={styles.regField}>
          <label htmlFor='repeat-password' className={styles.regLabel}>
            Repeat Password
          </label>
          <input
            type='password'
            id='repeat-password'
            className={styles.regInput}
            placeholder='Password'
            {...register('repeatPassword', {
              required: '*confirm your password',
              validate: (value) => value === password || 'Passwords must match',
            })}
          />
          {errors.repeatPassword && <p className={styles.errorText}>{errors.repeatPassword.message}</p>}
        </div>

        <div className={styles.regFieldCheckbox}>
          <input
            type='checkbox'
            id='agreement'
            className={styles.regInputCheckbox}
            {...register('agreement', {
              required: '*agree to terms and conditions',
            })}
          />
          <label htmlFor='agreement' className={styles.regLabelCheckbox}>
            I agree to the processing of my personal information
            {errors.agreement && <p className={styles.errorText}>{errors.agreement.message}</p>}
          </label>
        </div>

        <button type='submit' className={styles.regButton}>
          Create
        </button>
      </form>
      <p className={styles.regFooter}>
        Already have an account?{' '}
        <Link className={styles.regSignInLink} to='/sign-in'>
          Sign In.
        </Link>
      </p>
    </div>
  )
}

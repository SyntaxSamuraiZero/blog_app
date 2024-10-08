import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'

import getArticleEdit from '../../services/getArticleEdit'
import updateArticle from '../../services/updateArticle'
import Loading from '../Loading'
import Error from '../Error'

import styles from './EditArticle.module.scss'

export default function EditArticle() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { slug } = useParams()
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getArticleEdit(setArticle, setLoading, setError, slug)
  }, [])

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        shortDescription: article.description,
        text: article.body,
      })
      setTags(article.tagList)
    }
  }, [article, reset])

  const onSubmit = async (data) => {
    const formData = {
      article: {
        title: data.title,
        description: data.shortDescription,
        body: data.text,
        tagList: tags,
      },
    }

    await updateArticle(formData, slug, navigate)
  }

  const onClickDeleteTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove))
  }

  const onClickAddTag = () => {
    const newTag = tagInput.trim()
    if (newTag !== '' && !tags.includes(newTag)) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
      inputRef.current.focus()
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className={styles.createContainer}>
      <h2 className={styles.createTitle}>Edit article</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.createField}>
          <label htmlFor='title' className={styles.createLabel}>
            Title
          </label>
          <input
            type='text'
            id='title'
            className={styles.createInput}
            placeholder='Title'
            autoFocus
            {...register('title', {
              required: '*title is required',
            })}
          />
          {errors.title && <p className={styles.errorText}>{errors.title.message}</p>}
        </div>

        <div className={styles.createField}>
          <label htmlFor='shortDescription' className={styles.createLabel}>
            Short description
          </label>
          <input
            type='text'
            id='shortDescription'
            className={styles.createInput}
            placeholder='Title'
            {...register('shortDescription', {
              required: '*description is required',
            })}
          />
          {errors.shortDescription && <p className={styles.errorText}>{errors.shortDescription.message}</p>}
        </div>

        <div className={styles.createField}>
          <label htmlFor='text' className={styles.createLabel}>
            Text
          </label>
          <textarea
            type='text'
            id='text'
            className={styles['createInput--textarea']}
            placeholder='Text'
            {...register('text', {
              required: '*text is required',
            })}
          />
          {errors.text && <p className={styles.errorText}>{errors.text.message}</p>}
        </div>

        <div className={styles.createField}>
          <label htmlFor='addTags' className={styles.createLabel}>
            Tags
          </label>
          <div className={styles.tagsList}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tagItem}>
                <input type='text' name='delTags' value={tag} readOnly className={styles['createInput--tags']} />
                <button type='button' onClick={() => onClickDeleteTag(index)} className={styles.deleteTagButton}>
                  Delete
                </button>
              </div>
            ))}
            <div className={styles.tagItem}>
              <input
                type='text'
                id='addTags'
                name='addTags'
                ref={inputRef}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className={styles['createInput--tags']}
                placeholder='Tag'
              />
              <button onClick={onClickAddTag} type='button' className={styles.addTagButton}>
                Add tag
              </button>
            </div>
          </div>
        </div>

        <button type='submit' className={styles.saveButton}>
          Send
        </button>
      </form>
    </div>
  )
}

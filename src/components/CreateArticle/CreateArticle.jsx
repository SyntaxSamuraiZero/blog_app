import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import createArticle from "../../services/createArticle";

import styles from "./CreateArticle.module.scss";

export default function CreateArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = {
      article: {
        title: data.title,
        description: data.shortDescription,
        body: data.text,
        tagList: tags,
      },
    };

    await createArticle(formData, navigate);
  };

  const inputRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const onClickDeleteTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const onClickAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag !== "" && !tags.includes(newTag)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.createContainer}>
      <h2 className={styles.createTitle}>Create new article</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.createField}>
          <label htmlFor="title" className={styles.createLabel}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className={styles.createInput}
            placeholder="Title"
            autoFocus
            {...register("title", {
              required: "*title is required",
            })}
          />
          {errors.title && (
            <p className={styles.errorText}>{errors.title.message}</p>
          )}
        </div>

        <div className={styles.createField}>
          <label htmlFor="shortDescription" className={styles.createLabel}>
            Short description
          </label>
          <input
            type="text"
            id="shortDescription"
            className={styles.createInput}
            placeholder="Title"
            {...register("shortDescription", {
              required: "*description is required",
            })}
          />
          {errors.shortDescription && (
            <p className={styles.errorText}>
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        <div className={styles.createField}>
          <label htmlFor="text" className={styles.createLabel}>
            Text
          </label>
          <textarea
            type="text"
            id="text"
            className={styles["createInput--textarea"]}
            placeholder="Text"
            {...register("text", {
              required: "*text is required",
            })}
          />
          {errors.text && (
            <p className={styles.errorText}>{errors.text.message}</p>
          )}
        </div>

        <div className={styles.createField}>
          <label htmlFor="addTags" className={styles.createLabel}>
            Tags
          </label>
          <div className={styles.tagsList}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tagItem}>
                <input
                  type="text"
                  name="delTags"
                  value={tag}
                  readOnly
                  className={styles["createInput--tags"]}
                />
                <button
                  type="button"
                  onClick={() => onClickDeleteTag(index)}
                  className={styles.deleteTagButton}
                >
                  Delete
                </button>
              </div>
            ))}
            <div className={styles.tagItem}>
              <input
                type="text"
                id="addTags"
                name="addTags"
                ref={inputRef}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className={styles["createInput--tags"]}
                placeholder="Tag"
              />
              <button
                onClick={onClickAddTag}
                type="button"
                className={styles.addTagButton}
              >
                Add tag
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.saveButton}>
          Send
        </button>
      </form>
    </div>
  );
}

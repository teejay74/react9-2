import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function EditPost(props) {
  const textarea = useRef(null)
  const [content, setContent] = useState(props.content)
  const onWriteContent = (event) => {
    setContent(event.target.value)
  }

  const onClick = (event) => {
    if (!textarea.current.value) {
      event.preventDefault()
      if (!textarea.current.classList.contains('empty')) {
        textarea.current.classList.add('empty')
        return
      }
    }
    uploadPost()
  }

  const uploadPost = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_URL_POSTS, {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({ id: props.id, content: content }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h3>Редактировать пост</h3>
      <Link to="/">
        X
      </Link>
      <textarea
        ref={textarea}
        rows="10"
        value={content}
        onChange={onWriteContent}
      ></textarea>
      <Link to="/" onClick={onClick}>
        Сохранить
      </Link>
    </div>
  )
}
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './NewPost.css'

export default function NewPost() {
  const textarea = useRef(null)

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
        body: JSON.stringify({ id: 0, content: textarea.current.value }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    textarea.current.focus()
  }, [])

  return (
    <div>
      <Link to="/">
        X
      </Link>
      <textarea ref={textarea} rows="10"></textarea>
      <Link to="/" onClick={onClick}>
        Опубликовать
      </Link>
    </div>
  )
}
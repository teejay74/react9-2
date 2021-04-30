import moment from 'moment'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EditPost from '../EditPost/EditPost'

export default function SelectedPost(props) {
  const [editMode, setEditMode] = useState(false)

  const onToggleEditMode = () => {
    setEditMode(!editMode)
  }

  const post = JSON.parse(localStorage.getItem('selectedPost'))

  const onDelete = async (event) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_POSTS}/${event.target.id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error(response.statusText)
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (editMode) {
    return (
      <EditPost
        {...props}
        id={post.id}
        content={post.content}
        onClose={onToggleEditMode}
      />
    )
  }

  return (
    <li>
      <img src={post.avatar} alt={post.name} />
      <div>{post.name}</div>
      <span>{moment(post.created).fromNow()}</span>
      <p>{post.content}</p>
      <div>
        <button onClick={onToggleEditMode}>Редактировать</button>
        <Link to="/" id={post.id} onClick={onDelete}>
          Удалить
        </Link>
      </div>
    </li>
  )
}
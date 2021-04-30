import React from 'react'
import useJsonFetch from '../../hooks/useJsonFetch'
import moment from 'moment'
import './Main.css'
import CreatePost from '../CreatePost/CreatePost'
import { Link } from 'react-router-dom'

export default function Main() {
  const [loading, error, data] = useJsonFetch(process.env.REACT_APP_URL_POSTS)
  const onClick = (event) => {
    localStorage.setItem('selectedPost', event.target.closest('a').dataset.data)
  }

  return (
    <div>
      <CreatePost />
      asdas
      {loading}
      {error && <div>{error.message}</div>}
      {data && (
        <ul>
          {data.map((data) => (
            <Link
              to={`/posts/${data.id}`}
              key={data.id}
              data-data={JSON.stringify(data)}
              onClick={onClick}
            >
              <li>
                <img src={data.avatar} alt={data.name} />
                <div>{data.name}</div>
                <span>{moment(data.created).fromNow()}</span>
                <p>{data.content}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}
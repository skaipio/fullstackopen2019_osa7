import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'
import loginService from '../services/login'

beforeAll(() => {
  loginService.setUser({
    name: 'Koodi Apina',
    username: 'koodiapina',
  })
})

describe('Blog', () => {
  const blog = {
    title: 'This is a blog title',
    author: 'Author',
    likes: 100,
    user: {
      name: 'Koodi Apina',
      username: 'koodiapina',
    }
  }

  it('by default renders only title and author', () => {
    const component = render(<Blog blog={blog} onLike={() => {}} onRemove={() => {}} />)
  
    const compactBlog = component.container.querySelector('.compact-blog')
    const expandedBlog = component.container.querySelector('.expanded-blog')
    expect(expandedBlog).toBe(null)
  
    expect(compactBlog).toHaveTextContent('This is a blog title')
  
    expect(compactBlog).toHaveTextContent('Author')

    expect(compactBlog).not.toHaveTextContent('100')
  
    expect(compactBlog).not.toHaveTextContent('Koodi Apina')
  })
  
  it('renders likes and user name after clicking non-expanded blog', () => {
    const component = render(<Blog blog={blog} onLike={() => {}} onRemove={() => {}} />)
    let compactBlog = component.container.querySelector('.compact-blog')

    fireEvent.click(compactBlog)

    compactBlog = component.container.querySelector('.compact-blog')
    expect(compactBlog).toBe(null)

    const expandedBlog = component.container.querySelector('.expanded-blog')
  
    expect(expandedBlog).toHaveTextContent('This is a blog title')
  
    expect(expandedBlog).toHaveTextContent('Author')

    expect(expandedBlog).toHaveTextContent('100')
  
    expect(expandedBlog).toHaveTextContent('Koodi Apina')
  })
})

import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('SimpleBlog', () => {
  const blog = {
    title: 'This is a blog title',
    author: 'Author',
    likes: 100
  }

  it('renders title, author and likes', () => {
    const component = render(<SimpleBlog blog={blog} />)
  
    const titleDiv = component.container.querySelector('.blog-title')
  
    expect(titleDiv).toHaveTextContent('This is a blog title')
  
    expect(titleDiv).toHaveTextContent('Author')
  
    const likesDiv = component.container.querySelector('.blog-likes')
    expect(likesDiv).toHaveTextContent('100')
  })
  
  it('clicking like increments the likes count of the blog', async () => {
    const mockHandler = jest.fn()
  
    const { container } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  
    const button =  container.querySelector('.blog-likes button')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})

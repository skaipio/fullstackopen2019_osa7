import React from 'react'
import { 
  render, waitForElement 
} from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )

    await waitForElement(
      () => component.getByText('kirjaudu')
    ) 

    const blogList = component.container.querySelector('.blog-list')
    expect(blogList).toBe(null)
    let blog = component.container.querySelector('.compact-blog')
    expect(blog).toBe(null)
    blog = component.container.querySelector('.expanded-blog')
    expect(blog).toBe(null)

    const loginForm = component.container.querySelector('.login-form')
    expect(loginForm).toBeDefined()
  })

  it('if user is logged in, blogs are rendered', async () => {
    const userLoggedIn = {
      username: 'someone',
      name: 'Someone',
      id: 'abc'
    }
    window.localStorage.setItem('bloglistUser', JSON.stringify(userLoggedIn))

    const component = render(
      <App />
    )

    await waitForElement(
      () => component.getByText('logout')
    ) 

    const blogList = component.container.querySelector('.blog-list')
    expect(blogList).toBeDefined()
    let blogs = component.container.querySelectorAll('.compact-blog')
    expect(blogs.length).toBe(2)
  })
})
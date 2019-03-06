const blogs = [
  {
    id: '5c62d9f9c2ee409c86f956e1',
    title: 'r/2meirl4meirl is sad but funny',
    author: 'Redditors',
    url: 'https://www.reddit.com/r/2meirl4meirl/',
    likes: 12350360,
    user: {
      username: 'someone',
      name: 'Someone',
      id: 'abc'
    }
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'someoneelse',
      name: 'Someone Else',
      id: 'def'
    }
  }
]

const getAll = () => {
  return Promise.resolve([...blogs])
}

export default { getAll }

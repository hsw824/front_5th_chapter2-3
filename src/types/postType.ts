export interface NewPostType {
  title: string
  body: string
  userId: number
}

interface AuthorType {
  id: number
  image: string
  username: string
}

export interface PostType {
  body: string
  id: number
  reactions?: { likes: number; dislikes: number }
  tags?: string[]
  title: string
  userId: number
  views?: number
  author?: AuthorType
}

// {
//   "id": 1,
//   "title": "His mother had always taught him",
//   "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
//   "tags": [
//       "history",
//       "american",
//       "crime"
//   ],
//   "reactions": {
//       "likes": 192,
//       "dislikes": 25
//   },
//   "views": 305,
//   "userId": 121,
//   "author": {
//       "id": 121,
//       "username": "avahx",
//       "image": "https://dummyjson.com/icon/avahx/128"
//   }
// }

export interface CommentType {
  body: string
  postId: null
  userId: number
  id?: number
}

interface FullCommentType {
  body: string
  id: number
  likes: number
  postId: number
  user: {
    fullName: string
    id: number
    username: string
  }
}

export interface CommentsByPostId {
  [postId: string]: FullCommentType[]
}

import { useState } from "react"

interface CommentType {
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

interface CommentsByPostId {
  [postId: string]: CommentType[]
}

const getComments = async (postId: string) => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()

    console.log("ccccdata", data)

    return data.comments
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
  }
}

const useComment = () => {
  const [comments, setComments] = useState<CommentsByPostId>({})

  // 댓글 가져오기
  const fetchComments = async (postId) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    const commentData = await getComments(postId)
    setComments((prev) => ({ ...prev, [postId]: commentData }))
  }

  // 댓글 추가
  const addComment = async (data) => {
    setComments((prev) => ({
      ...prev,
      [data.postId]: [...(prev[data.postId] || []), data],
    }))
  }

  // 댓글 업데이트
  const updateComment = async (updatedCommentData) => {
    setComments((prev) => ({
      ...prev,
      [updatedCommentData.postId]: prev[updatedCommentData.postId].map((comment) =>
        comment.id === updatedCommentData.id ? updatedCommentData : comment,
      ),
    }))
  }

  // 댓글 삭제
  const deleteComment = async (id, postId) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id, postId) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  return { comments, fetchComments, addComment, updateComment, deleteComment, likeComment }
}

export default useComment

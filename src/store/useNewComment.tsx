import { useState } from "react"
import { CommentType } from "../types/commentType"

const defaultComment = { body: "", postId: null, userId: 1 }

const useNewComment = () => {
  const [newComment, setNewComment] = useState<CommentType>(defaultComment)

  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data: CommentType = await response.json()
      setNewComment(defaultComment)
      return data
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return { newComment, setNewComment, addComment }
}

export default useNewComment

import { useState } from "react"

interface CommentType {
  body: string
  id: number
  likes: number
  postId: number
}

const useEditComment = () => {
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(null)

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment!.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment!.body }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return { selectedComment, setSelectedComment, updateComment }
}

export default useEditComment

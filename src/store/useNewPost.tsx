import { useState } from "react"

const defaultPost = { title: "", body: "", userId: 1 }

export const useNewPost = () => {
  const [newPost, setNewPost] = useState(() => defaultPost)

  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      setNewPost(defaultPost)
      return data
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return { newPost, setNewPost, addPost }
}

import { useState } from "react"
import { PostType } from "../types/postType"

const useSelectPost = () => {
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null)

  return { selectedPost, setSelectedPost }
}
export default useSelectPost

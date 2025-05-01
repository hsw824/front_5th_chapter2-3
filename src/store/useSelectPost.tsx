import { useState } from "react"

const useSelectPost = () => {
  const [selectedPost, setSelectedPost] = useState(null)

  return { selectedPost, setSelectedPost }
}
export default useSelectPost

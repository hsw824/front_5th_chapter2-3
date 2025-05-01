import { useState } from "react"

const useDetailDialog = () => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  return { showPostDetailDialog, setShowPostDetailDialog }
}

export default useDetailDialog

import { useState } from "react"

const useCommentDialog = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)

  return { showAddCommentDialog, setShowAddCommentDialog }
}

export default useCommentDialog

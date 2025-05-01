import { useState } from "react"

const useEditCommentDialog = () => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  return { showEditCommentDialog, setShowEditCommentDialog }
}

export default useEditCommentDialog

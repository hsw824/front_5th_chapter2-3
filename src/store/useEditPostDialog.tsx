import { useState } from "react"

const useEditPostDialog = () => {
  const [showEditDialog, setShowEditDialog] = useState(false)

  return { showEditDialog, setShowEditDialog }
}

export default useEditPostDialog

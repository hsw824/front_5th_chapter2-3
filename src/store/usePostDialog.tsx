import { useState } from "react"

// usePost와 도메인 기능으로 통합하려고 했으나 일단 기능별 분리로 진행함.
const usePostDialog = () => {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return { showAddDialog, setShowAddDialog }
}

export default usePostDialog

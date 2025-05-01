import { useState } from "react"
import { UserType } from "../types/userType"

const getUserInfo = async (id: number) => {
  try {
    const response = await fetch(`/api/users/${id}`)
    const userData = await response.json()

    return userData
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
  }
}

const useUserModal = () => {
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // 사용자 모달 열기
  const openUserModal = async (user: UserType) => {
    const userData = await getUserInfo(user.id)
    setSelectedUser(userData)
    setShowUserModal(true)
  }

  return { showUserModal, selectedUser, openUserModal, setShowUserModal }
}

export default useUserModal

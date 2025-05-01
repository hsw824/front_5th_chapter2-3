import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useQueryState = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [queryState, setQueryState] = useState({
    skip: 0,
    limit: 10,
    search: "",
    sortBy: "",
    sortOrder: "asc",
    tag: "",
    searchQuery: "",
    selectedTag: "",
  })

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    Object.entries(queryState).forEach(([key, value]) => {
      if (value) params.set(key, value.toString())
    })
    navigate(`?${params.toString()}`, { replace: true })
  }

  // 상태 초기화 (URL에서 파라미터 읽기)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setQueryState({
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      search: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: params.get("sortOrder") || "asc",
      tag: params.get("tag") || "",
      searchQuery: params.get("searchQuery") || "",
      selectedTag: params.get("selectedTag") || "",
    })
  }, [location.search])

  return { queryState, setQueryState, updateURL }
}

export default useQueryState

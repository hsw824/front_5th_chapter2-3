import { useState } from "react"

const useLimit = () => {
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
}

export default useLimit

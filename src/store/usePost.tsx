import { useEffect, useRef, useState } from "react"

// 로딩 setState 관계 끊기

interface AuthorType {
  id: number
  image: string
  username: string
}

interface PostType {
  body: string
  id: number
  reactions?: { likes: number; dislikes: number }
  tags?: string[]
  title: string
  userId: number
  views?: number
  author?: AuthorType
}

interface PostDataType {
  limit: number
  posts: PostType[]
  skip: number
  total: number
}

interface ImageInfoType {
  limit: number
  skip: number
  total: number
  users: AuthorType[]
}

const defaultAuthor = {
  id: 0,
  image: "",
  username: "알 수 없는 사용자",
}

const fetchPost = async ({ limit, skip }) => {
  try {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    const data: PostDataType = await response.json()

    return data
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
  }
}

const fetchImage = async () => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data: ImageInfoType = await response.json()

    return data.users
  } catch (error) {
    console.error("이미지 정보 가져오기 오류:", error)
  }
}

const fetchSearchPost = async ({ searchQuery }) => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data: PostDataType = await response.json()

    return data
  } catch (error) {
    console.error("게시물 검색 오류:", error)
  }
}

const getPostsByTag = async (tag: string) => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}`)

    const data: PostDataType = await response.json()

    return data
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류", error)
  }
}

const patchPost = async (selectedPost) => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("게시물 업데이트 오류:", error)
  }
}

export const usePost = (queryState, selectedPost, setIsLoading) => {
  const [posts, setPosts] = useState<PostType[]>([])
  const total = useRef(0)
  // 게시물 가져오기
  const fetchPosts = async () => {
    setIsLoading(true)
    const [postList, imageList] = await Promise.all([fetchPost(queryState), fetchImage()])

    if (!postList || !imageList) return

    const postsWithUsers = postList.posts.map((post) => ({
      ...post,
      author: imageList.find((user) => user.id === post.userId) || defaultAuthor,
    }))

    setPosts(postsWithUsers)
    total.current = postList.total
    setIsLoading(false)
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!queryState.searchQuery) {
      fetchPosts()
      return
    }
    setIsLoading(true)

    const data = await fetchSearchPost(queryState)

    if (!data) return

    setPosts(data.posts)
    total.current = data.total

    setIsLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setIsLoading(true)
    try {
      const [taggedPost, imageList] = await Promise.all([getPostsByTag(tag), fetchImage()])

      if (!taggedPost || !imageList) return

      const postsWithUsers = taggedPost.posts.map((post) => ({
        ...post,
        author: imageList.find((user) => user.id === post.userId) || defaultAuthor,
      }))

      setPosts(postsWithUsers)
      total.current = taggedPost.total
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setIsLoading(false)
  }

  const addPost = async (data: PostType) => {
    setPosts((prev) => [data, ...prev])
  }

  // 게시물 업데이트
  const updatePost = async () => {
    const data = await patchPost(selectedPost)
    setPosts(posts.map((post) => (post.id === data.id ? data : post)))
  }

  // 게시물 삭제
  const deletePost = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  useEffect(() => {
    if (queryState.selectedTag) {
      fetchPostsByTag(queryState.selectedTag)
    } else {
      fetchPosts()
    }
  }, [queryState])

  return { posts, total, fetchPost, searchPosts, fetchPostsByTag, addPost, updatePost, deletePost }
}

export default usePost

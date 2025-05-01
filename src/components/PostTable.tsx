import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../shared/ui/Table"
import { Button } from "../shared/ui/Button"
import { HighlightText } from "./HighlightText"
import { PostType } from "../types/postType"
import { UserType } from "../types/userType"

interface PropsType {
  posts: PostType[]
  searchQuery: string
  selectedTag: string
  deletePost: (id: number) => Promise<void>
  openPostDetail: (post: PostType) => void
  openUserModal: (user: UserType) => Promise<void>
  updateURL: () => void
  setSelectedPost: React.Dispatch<React.SetStateAction<PostType | null>>
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  setQueryState: React.Dispatch<
    React.SetStateAction<{
      skip: number
      limit: number
      search: string
      sortBy: string
      sortOrder: string
      tag: string
      searchQuery: string
      selectedTag: string
    }>
  >
}

const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  deletePost,
  openPostDetail,
  openUserModal,
  updateURL,
  setSelectedPost,
  setShowEditDialog,
  setQueryState,
}: PropsType) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{HighlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setQueryState((prev) => ({ ...prev, tag }))
                        updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PostTable

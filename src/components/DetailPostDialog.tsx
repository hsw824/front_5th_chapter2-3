import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui/Dialog"
import { CommentsByPostId, CommentType } from "../types/commentType"
import { PostType } from "../types/postType"
import { HighlightText } from "./HighlightText"
import { RenderComments } from "./RenderComments"

interface PropsType {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>>
  selectedPost: PostType
  searchQuery: string
  comments: CommentsByPostId

  setSelectedComment: React.Dispatch<React.SetStateAction<CommentType | null>>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, postId: number) => Promise<void>
  setNewComment: React.Dispatch<React.SetStateAction<CommentType>>
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const DetailPostDialog = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  comments,
  setSelectedComment,
  deleteComment,
  likeComment,
  setNewComment,
  setShowAddCommentDialog,
  setShowEditCommentDialog,
}: PropsType) => {
  console.log("selectedPost", selectedPost)
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{HighlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{HighlightText(selectedPost?.body, searchQuery)}</p>
          <RenderComments
            postId={selectedPost?.id}
            comments={comments}
            setSelectedComment={setSelectedComment}
            deleteComment={deleteComment}
            likeComment={likeComment}
            setNewComment={setNewComment}
            setShowAddCommentDialog={setShowAddCommentDialog}
            setShowEditCommentDialog={setShowEditCommentDialog}
            searchQuery={searchQuery}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DetailPostDialog

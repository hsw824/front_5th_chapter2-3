import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui/Dialog"
import { HighlightText } from "./HighlightText"
import { RenderComments } from "./RenderComments"

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
}) => {
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

import { Button } from "../shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui/Dialog"
import { Textarea } from "../shared/ui/Textarea"
import { CommentType } from "../types/commentType"

interface PropsType {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  newComment: CommentType
  setNewComment: React.Dispatch<React.SetStateAction<CommentType>>
  addComment: () => Promise<CommentType | undefined>
}

const AddCommentDialog = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  setNewComment,
  addComment,
}: PropsType) => {
  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentDialog

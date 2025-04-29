// TODO: 일단 컴포넌트들에 useStore를 준건 개별적으로 적용되기 때문에 업데이트가 안될 수 있음! props로 다시 바꾸기

import PostTable from "../components/PostTable"
import Pagination from "../components/Pagination"
import SearchControl from "../components/SearchControl"
import AddPostDialog from "../components/AddPostDialog"
import EditPostDialog from "../components/EditPostDialog"
import AddCommentDialog from "../components/AddCommentDialog"
import EditCommentDialog from "../components/EditCommentDialog"
import DetailPostDialog from "../components/DetailPostDialog"
import UserDialog from "../components/UserDialog"

import { useStore } from "../store/useStore"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/Card"
import { Button } from "../shared/ui/Button"

const PostsManager = () => {
  const {
    selectedPost,
    showEditDialog,
    loading,
    comments,
    selectedComment,
    newComment,
    showAddCommentDialog,
    showEditCommentDialog,
    showPostDetailDialog,
    showUserModal,
    selectedUser,

    showAddDialog,
    setShowAddDialog,
    newPost,
    setNewPost,
    addPost,
    setSelectedComment,
    updatePost,
    addComment,
    updateComment,
    setNewComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setShowPostDetailDialog,
    setShowUserModal,

    posts,
    searchQuery,
    selectedTag,
    deletePost,
    openPostDetail,
    openUserModal,
    setSelectedTag,
    updateURL,
    setSelectedPost,
    setShowEditDialog,
    deleteComment,
    likeComment,
  } = useStore()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchControl />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              deletePost={deletePost}
              openPostDetail={openPostDetail}
              openUserModal={openUserModal}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}
      />

      {/* 게시물 수정 대화상자 */}
      <EditPostDialog
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
      />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />
      {/* 게시물 상세 보기 대화상자 */}
      <DetailPostDialog
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        searchQuery={searchQuery}
        comments={comments}
        setSelectedComment={setSelectedComment}
        deleteComment={deleteComment}
        likeComment={likeComment}
        setNewComment={setNewComment}
        setShowAddCommentDialog={setShowAddCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
      />

      {/* 사용자 모달 */}
      <UserDialog showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />
    </Card>
  )
}

export default PostsManager

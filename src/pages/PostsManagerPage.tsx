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

import useSelectPost from "../store/useSelectPost"
import usePostDialog from "../store/usePostDialog"
import useNewComment from "../store/useNewComment"
import useCommentDialog from "../store/useCommentDialog"
import useEditComment from "../store/useEditComment"
import useEditCommentDialog from "../store/useEditCommentDialog"
import useTags from "../store/useTags"
import usePost from "../store/usePost"
import useEditPostDialog from "../store/useEditPostDialog"
import useLoading from "../store/useLoading"
import useQueryState from "../store/useQueryState"
import useComment from "../store/useComment"
import useUserModal from "../store/useUserModal"
import useDetailDialog from "../store/useDetailDialog"

import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/Card"
import { Button } from "../shared/ui/Button"
import { useNewPost } from "../store/useNewPost"
import { PostType } from "../types/postType"

const PostsManager = () => {
  const { selectedPost, setSelectedPost } = useSelectPost()

  // detail Dialog
  const { showPostDetailDialog, setShowPostDetailDialog } = useDetailDialog()
  // 게시물 상세 보기
  const openPostDetail = (post: PostType) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  const { showUserModal, setShowUserModal, selectedUser, openUserModal } = useUserModal()

  // comments

  const { comments, fetchComments, addComment, updateComment, deleteComment, likeComment } = useComment()

  // query State
  const { queryState, setQueryState, updateURL } = useQueryState()

  // 로딩 hook
  const { isLoading, setIsLoading } = useLoading()

  // 게시글 수정 팝업
  const { showEditDialog, setShowEditDialog } = useEditPostDialog()

  // 기본 게시물 store + fetch 로직
  const { posts, total, searchPosts, fetchPostsByTag, addPost, updatePost, deletePost } = usePost(
    queryState,
    selectedPost,
    setIsLoading,
  )

  // 게시물 추가 관련 로직 store + 통합 핸들러
  const { newPost, setNewPost, addPost: createPost } = useNewPost()
  const { showAddDialog, setShowAddDialog } = usePostDialog()

  const handleAddPost = async () => {
    const newPostData = await createPost()
    addPost(newPostData)
    setShowAddDialog(false)
  }

  // 댓글 추가 관련 store + 통합 핸들러
  const { newComment, setNewComment, addComment: createComment } = useNewComment()
  const { showAddCommentDialog, setShowAddCommentDialog } = useCommentDialog()

  const handleAddComment = async () => {
    const newCommentData = await createComment()
    addComment(newCommentData)
    setShowAddCommentDialog(false)
  }

  // 댓글 수정 관련 store + 통합 핸들러
  const { selectedComment, setSelectedComment, updateComment: updatedComment } = useEditComment()
  const { showEditCommentDialog, setShowEditCommentDialog } = useEditCommentDialog()

  const handleUpdateComment = async () => {
    const updatedCommentData = await updatedComment()

    updateComment(updatedCommentData)
    setShowEditCommentDialog(false)
  }
  console.log("selectedComment", selectedComment)
  // tags store
  const { tags } = useTags()

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
          <SearchControl
            searchQuery={queryState.searchQuery}
            searchPosts={searchPosts}
            selectedTag={queryState.selectedTag}
            fetchPostsByTag={fetchPostsByTag}
            updateURL={updateURL}
            tags={tags}
            sortBy={queryState.sortBy}
            sortOrder={queryState.sortOrder}
            setQueryState={setQueryState}
          />

          {/* 게시물 테이블 */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={queryState.searchQuery}
              selectedTag={queryState.selectedTag}
              deletePost={deletePost}
              openPostDetail={openPostDetail}
              openUserModal={openUserModal}
              setQueryState={setQueryState}
              updateURL={updateURL}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination limit={queryState.limit} skip={queryState.skip} total={total} setQueryState={setQueryState} />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={handleAddPost}
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
        addComment={handleAddComment}
      />

      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={handleUpdateComment}
      />
      {/* 게시물 상세 보기 대화상자 */}
      <DetailPostDialog
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        searchQuery={queryState.searchQuery}
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

import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm(
      "Are you confirm!! really want to delete this comment? "
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className=" border-gray-300 ">
      {/* //-> Blog title column  */}
      <td className="px-6 py-4">
        <div className="max-w-xs">
          <p className="font-medium text-gray-900 truncate" title={blog.title}>
            {blog.title}
          </p>
          <p className="text-xs text-gray-500 mt-1">{blog.category}</p>
        </div>
      </td>

      {/* //-> comment details column  */}
      <td className="px-6 py-4">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-2   ">
            {/* <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center"> */}
            Username:
            <span className="font-medium text-primary text-sm">
              {comment.name}
            </span>
          </div>
          Comment:
          <span className="text-sm text-gray-600"> {comment.content}</span>
        </div>
      </td>

      {/* //-> date column   */}
      <td className="p-4 text-center hidden sm:table-cell">
        <span className="text-sm text-gray-500">
          {BlogDate.toLocaleDateString()}
        </span>
      </td>

      {/* //-> Action column  */}
      <td className="p-4">
        <div className="flex items-center justify-center gap-2">
          {!comment.isApproved ? (
            <button
              onClick={approveComment}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
              title="Approve"
            >
              <img src={assets.tick_icon} className="w-3 h-3" />
            </button>
          ) : (
            <button className="px-3 py-1.5 text-xs bg-green-50 text-green-700 border border-green-200 rounded-md">
              Approved
            </button>
          )}
          <button
            onClick={deleteComment}
            title="Delete"
            className="flex items-center gap-1 px-2 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
          >
            X
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;

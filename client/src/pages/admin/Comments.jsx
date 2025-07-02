import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { assets } from "../../assets/assets";
import CommentTableItem from "../../components/Admin/CommentTableItem";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5  sm:pl-14 sm:py-10 bg-blue-50/50">
      {/*//->  Header  */}
      <div className="flex items-center justify-between max-w-4xl mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Comments</h1>

        {/* //-> buttons  */}
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Not Approved")}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              filter === "Not Approved"
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Pending ({comments.filter((c) => !c.isApproved).length})
          </button>

          <button
            onClick={() => setFilter("Approved")}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              filter === "Approved"
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Approved ({comments.filter((c) => c.isApproved).length})
          </button>
        </div>
      </div>

      {/*//-> Heading column of comment table  */}
      <div className="flex max-w-4xl text-xs text-center justify-around text-black uppercase bg-gray-200 rounded-t-lg">
        <p className="px-6 py-4 font-medium   flex-1/4">Blog Title</p>
        <p className="px-6 py-4 font-medium flex-1/4  lg:flex-1/2 text-center">
          Comment Details
        </p>
        <p className="p-4 font-medium text-center hidden sm:table-cell flex-1/20 lg:flex-1/6 ">
          Date
        </p>
        <p className="p-4 font-medium text-center flex-1/10 lg:flex-1/6">
          Actions
        </p>
      </div>

      <div className="relative max-h-[60vh] overflow-auto max-w-4xl  shadow rounded-b-lg  scrollbar-hide bg-white">
        {/*//-> Table Content  */}
        <table className="w-full text-sm tex-gray-500 ">
          <tbody className="w-full">
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}

            {/* //-> empty comment box  */}
            {comments.filter((comment) => {
              if (filter === "Approved") return comment.isApproved === true;
              return comment.isApproved === false;
            }).length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 ">
                  <img
                    src={assets.comment_icon}
                    alt="comment"
                    className="w-12 h-12 mx-auto opacity-20 mb-2"
                  />

                  <p className="text-gray-500 capitalize">
                    No '{filter}' comments found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;

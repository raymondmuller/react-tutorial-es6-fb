const React = require("react");
const Comment = require("./Comment");
const CommentForm = require("./CommentForm");
const CommentDelete = require("./CommentDelete");
const CommentReplySection = require("./CommentReplySection");
const CommentLikeSection = require("./CommentLikeSection");

class CommentList extends React.Component {
  
    render() {
        return (
            <div className="commentList">
							{this.props.comments.map((comment,index) => 
								<div>
								<Comment 
									onCommentDelete={this.props.onCommentDelete} 
									key={index}
									replies={comment.replies}
									author={comment.author}> {comment.text}
								<div>	
								<CommentDelete id={index} onCommentDelete={this.props.onCommentDelete}/>
								<CommentLikeSection />
								<CommentReplySection
								key={index}
								id={index}
								replies={comment.replies}
								onCommentSubmit={this.props.onReplySubmit}
								 hasReplies={comment.replies} />
								 </div>
								 </Comment>
								</div>
									)}
				</div>
        )
    };
};

module.exports = CommentList;

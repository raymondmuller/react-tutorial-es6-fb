const React = require("react");
const Comment = require("./Comment");
const CommentLikeSection = require("./CommentLikeSection");

class CommentReplyList extends React.Component {
  render() {
      return (
        <div className="replyList">
            {this.props.replies ? <div>
              {this.props.replies.map((comment, index) => <Comment author={comment.author} id={index} key={index} onCommentDelete={this.props.onReplyDelete} replies={comment.replies}>
                {comment.text}
                <div><CommentLikeSection /></div>
            </Comment>)}
          </div> : null}
        </div>
      )
    }
};

module.exports = CommentReplyList;

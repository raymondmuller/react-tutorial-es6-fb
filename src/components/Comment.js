const React = require("react");
const CommentForm = require("./CommentForm");

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReplying: false
        }
    }

    handleCommentSubmit(reply) {
        const newComments = this.state.comments
        newComments.splice(value.target.id, 1);
        this.setState({
            comments: newComments
        });
        fetch(REQUEST_URL, {
          method: 'put',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComments)
          })
          .then(response => response.json())
          .then(data => this.setState({
              comments: data
          }))
          .catch(err => console.error(REQUEST_URL, err));
   	 }

    handleReply() {
        console.log("reply");
        const replyState = this.state.isReplying;
        const newReplyState = !replyState;
        this.setState({
            isReplying: newReplyState
        });
    }
    render() {
        return ( <div className = "comment">
            <img className = "commentImage"
            src="assets/facebook_image.gif"/>
            <div className="commentContent">
            <h2 className="commentAuthor"> {
                this.props.author
            } </h2> <span className = "commentText"> {
            this.props.children
        } </span> </div>
				 { this.props.isReplying ? <CommentForm id={index} onCommentSubmit={this.props.onReplyCommit} /> : null}
 </div>
    );
	}
};

module.exports = Comment;

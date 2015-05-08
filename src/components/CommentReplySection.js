const React = require("react");
const CommentReplyList = require("./CommentReplyList");
const CommentForm = require("./CommentForm");

class CommentReplySection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReplying: false,
			showReplies: false
		}
	}

    handleShowReplies() {
        console.log("show replies")
        this.setState({
            showReplies: true
        });
    }
    handleHideReplies() {
        console.log("hide replies")
        this.setState({
            showReplies: false
        });
    }

	handleReply() {
		const replyState = !this.state.isReplying
		this.setState({
			isReplying: replyState
		})
	}

    render() {
        return (
            <div className="commentReplySection">
				<span className="commentExtraText"> - <a onClick={this.handleReply.bind(this)} className="commentExtraText">Reply</a></span>
				{this.props.hasReplies && !this.state.showReplies ? <span className="commentExtraText"> - <a onClick={this.handleShowReplies.bind(this)} className="commentExtraText">Show replies </a></span> : null}
				{this.props.hasReplies && this.state.showReplies ? <span className="commentExtraText"> - <a onClick={this.handleHideReplies.bind(this)} className="commentExtraText">Hide replies </a></span> : null}
				{ this.state.showReplies ? <CommentReplyList  onReplyDelete={this.props.onReplyDelete} replies={this.props.replies} /> : null }
			 	{ this.state.isReplying ? <CommentForm id={this.props.id} onCommentSubmit={this.props.onCommentSubmit} /> : null}
			</div>
        )
    }
}

module.exports = CommentReplySection;

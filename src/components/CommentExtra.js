var React = require("react");

class CommentExtra extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            like: false,
            likeCount: 0
        };
    }

    handleUnlike() {
        const currentLikeCount = this.state.likeCount;
        const newLikeCount = currentLikeCount - 1;
        this.setState({
            like: false,
            likeCount: newLikeCount
        });
    }

    handleLike() {
        const currentLikeCount = this.state.likeCount;
        const newLikeCount = currentLikeCount + 1;
        this.setState({
            like: true,
            likeCount: newLikeCount
        });
    }
    render() {
        return (
            <div className="commentExtra">
				
				<span className="commentExtraText"> - <a onClick={this.props.onReply} className="commentExtraText">Reply</a></span>
				{this.props.hasReplies && !this.props.isShowingReplies ? <span className="commentExtraText"> - <a onClick={this.props.onShowReplies} className="commentExtraText">Show replies </a></span> : null}
				{this.props.hasReplies && this.props.isShowingReplies ? <span className="commentExtraText"> - <a onClick={this.props.onHideReplies} className="commentExtraText">Hide replies </a></span> : null}

			</div>
        )
    }
}

module.exports = CommentExtra;

var React = require("react");

class CommentLikeSection extends React.Component {

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
            <div className="commentLikeSection">
				{ this.state.like ? 
					<a className="commentExtraText" onClick={this.handleUnlike.bind(this)}> Unlike </a>
					: <a className="commentExtraText" onClick={this.handleLike.bind(this)}> Like </a> }

				{this.state.likeCount > 0 ? <span className="commentExtraText"> - </span> : null }
				{this.state.likeCount > 0 ? <img className="commentLikeImage" src="assets/facebook_like.png"/> : null }
				{this.state.likeCount > 0 ? <span className="commentExtraText"> {this.state.likeCount} people </span> : null}
				</div>
        )

    }


}

module.exports = CommentLikeSection;

var React = require("react");

class CommentDelete extends React.Component {
  render() {
    return ( 
    	<div className = "commentCross" id = {this.props.id} onClick = {this.props.onCommentDelete}> X < /div>
    )
  }
}

module.exports = CommentDelete;

const React = require("react");

class CommentForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        const author = React.findDOMNode(this.refs.author).value.trim();
        const text = React.findDOMNode(this.refs.text).value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({
            author: author,
            text: text
        }, this.props.id);
        React.findDOMNode(this.refs.author).value = "";
        React.findDOMNode(this.refs.text).value = "";
        return;
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
					<img className="commentImage" src="assets/facebook_image.gif"/>
					<input className="commentFormInput commentFormName" type="text" placeholder="Your name" ref="author"/>
					<input className="commentFormInput commentFormText" type="text" placeholder="Say something..." ref="text"/>
					<input className="commentFormButton" type="submit" value="Post"/>
				</form>
        );
    }

};

module.exports = CommentForm;

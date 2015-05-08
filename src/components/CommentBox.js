const React = require('react');
const fetch = require('isomorphic-fetch');
const CommentList = require("./CommentList");
const CommentForm = require("./CommentForm");
const REQUEST_URL = "api/comments.json"

class CommentBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: []
        };
    }

    handleCommentDelete(value) {
        const selectedComment = this.state.comments[value.target.id]
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

    handleReplyDelete(value) {
        console.log("delete reply")
        const selectedReply = this.state.comments.replies[value.target.id]
        const newComments = this.state.comments.replies
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

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    comments: response,
                });
            })
    }

    handleCommentSubmit(comment) {
        const comments = this.state.comments;
        const newComments = comments.concat([comment]);
        this.setState({
            comments: newComments
        });
        fetch(REQUEST_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            })
            .then(response => response.json())
            .then(data => this.setState({
                comments: data
            }))
            .catch(err => console.error(REQUEST_URL, err));
    }
    handleReplySubmit(reply, index) {
      const comments = this.state.comments;
      var newReplies = []
      var replies = comments[index].replies
      
      replies ? newReplies = replies.concat([reply]) :  newReplies.push(reply);
      
      delete comments[index].replies
      comments[index].replies = newReplies
      this.setState({
          comments: comments
      });
      fetch(REQUEST_URL, {
              method: 'put',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(comments)
          })
          .then(response => response.json())
          .then(data => this.setState({
              comments: data
          }))
          .catch(err => console.error(REQUEST_URL, err));
    } 

    componentDidMount() {
        this.fetchData();
        setInterval(() => {
            this.fetchData()
        }, this.props.interval);
    }

    render() {
        return (
            <div className="commentBox">
        <h1>Comments</h1>
            <CommentList onReplySubmit={this.handleReplySubmit.bind(this)} onCommentDelete={this.handleCommentDelete.bind(this)} onReplyDelete={this.handleReplyDelete.bind(this)}  comments={this.state.comments} url={REQUEST_URL} interval={this.props.interval}/>
            <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
      </div>
        );
    }
};

module.exports = CommentBox;

React.render(<CommentBox interval={60000} />, document.getElementById("content"));

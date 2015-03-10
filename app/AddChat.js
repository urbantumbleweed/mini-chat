var React = require('react');
var $ = require('jquery');

var APP_KEY='Hu0KShZQdKP5Osl2AcRzTpFxs7UAxAn10oeBGo9D'
var API_KEY='Qrmeyx5hlQHLLWslz6wXsODr8st05oocpNfR16Af'

var AddChat = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    text: React.PropTypes.string
  },
  getInitialState: function(){
    return {
      text: ''
    }
  },
  getDefaultProps: function(){
    return {
      url: "https://api.parse.com/1/classes/chat",
    }
  },
  addChat: function(){
    $.ajax({
      url: this.props.url,
      type: 'POST',
      beforeSend: function(request){
        request.setRequestHeader('X-Parse-Application-Id', APP_KEY);
        request.setRequestHeader("X-Parse-REST-API-Key", API_KEY);
        request.setRequestHeader("Content-Type", 'application/json');
      },
      data: JSON.stringify({text: this.refs.newChatInput.getDOMNode().value}),
      error: function(){
        console.log('Error on post');
      },
      success: function(){
        console.log('Post successful')
        this.setState({
          text: ''
        });
      }.bind(this)
    });
  },
  handleSubmit: function(e){
    if(e.keyCode === 13)
      this.addChat()
  },
  handleChange: function(e){
    this.setState({
      text: e.target.value
    });
  },
  render: function(){
    return (
      <div className="form-group">
        <input
          type='text'
          placeholder='Compose Message'
          ref='newChatInput'
          value={this.state.text}
          onChange={this.handleChange}
          className='form-control'
          onKeyDown={this.handleSubmit}/>
      </div>
    )
  }
});

module.exports = AddChat;


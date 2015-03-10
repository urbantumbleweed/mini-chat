var React = require('react');
var $ = require('jquery');

var APP_KEY='Hu0KShZQdKP5Osl2AcRzTpFxs7UAxAn10oeBGo9D'
var API_KEY='Qrmeyx5hlQHLLWslz6wXsODr8st05oocpNfR16Af'

var ChatList = React.createClass({
  getInitialState: function(){
    return {
      chats: []
    }
  },
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  getDefaultProps: function(){
    return {
      url: 'https://api.parse.com/1/classes/chat'
    };
  },
  componentDidMount: function(){
    this.interval = setInterval(function(){
      this.getChats();
    }.bind(this), 1000);
  },
  componentWillUnmount: function(interval){
    clearInterval(this.interval);
  },
  getChats: function(){
    $.ajax({
      url: this.props.url,
      type: 'GET',
      beforeSend: function(request){
        request.setRequestHeader('X-Parse-Application-Id', APP_KEY);
        request.setRequestHeader("X-Parse-REST-API-Key", API_KEY);
        request.setRequestHeader("Content-Type", 'application/json');
      },
      error: function(data){
        console.log('There was an error in getting the chats');
      },
      success: function(data){
        if (this.isMounted()) {
          this.setState({
            chats: data.results
          });
        }
      }.bind(this)
    })
  },
  render: function(){
    var list = this.state.chats.map(function(item, index){
      return (
        <li key={item.objectId}
          className='list-group-item'>
          {item.text}
        </li>
      );
    });
    return (
      <ul className="list-group">
        {list}
      </ul>
    )
  }
});

module.exports = ChatList;
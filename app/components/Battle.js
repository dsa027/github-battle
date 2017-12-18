var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview(props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
        <button
          className='reset'
          onClick={props.onReset.bind(null, props.id)}>
          Reset
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userName: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;
    this.setState (() => {
      return {
        username: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }
  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={this.state.username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: '',
      playerTwoImage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, username) {
    this.setState(() => {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }
  handleReset(id) {
    this.setState(() => {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = '';
      return newState;
    });
  }
  render() {
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;
    return (
      <div>
        <div className='row'>
          {!playerOneName && <PlayerInput
            id='playerOne' label='Player One' onSubmit={this.handleSubmit}/>
          }
          {playerOneName && <PlayerPreview
            id={'playerOne'}
            username={playerOneName}
            avatar={playerOneImage}
            onReset={this.handleReset}/>
          }

          {!playerTwoName && <PlayerInput
            id='playerTwo' label='Player Two' onSubmit={this.handleSubmit}/>
          }
          {playerTwoName && <PlayerPreview
            id={'playerTwo'}
            username={playerTwoName}
            avatar={playerTwoImage}
            onReset={this.handleReset}/>
          }
        </div>

        {playerOneName && playerTwoName &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
              Battle
            </Link>
        }
      </div>
    )
  }
}

module.exports = Battle;

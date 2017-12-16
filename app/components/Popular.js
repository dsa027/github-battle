var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
  return (
    <div>
      <ul className='languages'>
        {props.languages.map(lang => {
          return (
            <li
              style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
              onClick={props.onSelect.bind(null, lang)}
              key={lang}>

              {lang}

            </li>
        )
      })}
      </ul>
    </div>
  )
}

function RepoGrid(props) {
  if (props.repos === null) return null;
  return (
    <ul className='popular-list' >
      {props.repos.map((repo, index) => {
        return (
          <li key={index} className='popular-item'>
            <p className='popular-rank'>#{index+1}</p>
            <p>
              <a href={repo.html_url} target='_blank'>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </a>
            </p>
            <p>
              <a className='repo-url' href={repo.html_url}>
                <span className='repo-name span-block'>{repo.name}</span>
              </a>
              <span className='span-block'>@{repo.owner.login}</span>
              <span className='span-block'>{repo.stargazers_count} stars</span>
            </p>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired
};



class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    this.state = {
      selectedLanguage: this.languages[0],
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this);
    this.getPopularRepos = this.getPopularRepos.bind(this);
  }

  getPopularRepos(lang) {
    return api.fetchPopularRepos(lang)
      .then(repos => {
        this.setState(() => {
          return {
            repos: repos
          }
        })
      });
  }

  componentDidMount() {
    this.getPopularRepos(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
    this.getPopularRepos(lang);
  }

  render() {
    return (
      <div>
        <SelectLanguage
          onSelect={this.updateLanguage}
          selectedLanguage={this.state.selectedLanguage}
          languages={this.languages}
        />
        {!this.state.repos
          ? <p>Loading...</p>
          : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

module.exports = Popular;

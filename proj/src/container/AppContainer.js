
import serialize from "form-serialize";
import react from 'react'





class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      rates: [];
      isFetching: false
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    fetch("https://api.fixer.io/latest")
      .then(response => response.json())
      .then(json => {
        this.setState({
          rates: json.data,
          isFetching: false
        });
      });
  }

    const body = serialize(form, { hash: true });
    console.log(body);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = {
      headers,
      method: "POST",
      body: JSON.stringify(body)
    };

    this.setState({ isFetching: true });

    fetch("https://reqres.in/api/users", options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        this.setState(
          {
            isFetching: false,
            users: [...this.state.users, json]
          },
          () => {
            form.reset();
          }
        );
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isFetching: false,
          error
        });
      });
  };

  onDeleteUser = e => {
    e.preventDefault();
    let id = e.target;
    const body = serialize(id, { hash: true });
    id = body.id;
    console.log("id-----------");
    console.log(id);

    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");

    const options = {
      // headers,
      method: "DELETE"
      // body: JSON.stringify(body)
    };

    this.setState({ isFetching: true });

    fetch(`https://reqres.in/api/users/${id}`, options)
      .then(response => {
        // this.state.users - { where: (id = { id }) };

        this.setState({
          isFetching: false,
          users: this.state.users.filter(u => u.id != id)
        });
        console.log("user deleted");
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Send our state and functions as props
  render() {
    return (
      <App
        onAddUser={this.onAddUser}
        onDeleteUser={this.onDeleteUser}
        {...this.state}
      />
    );
  }
}

export default AppContainer;
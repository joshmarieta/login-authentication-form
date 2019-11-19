import React ,{Component} from 'react';
import './App.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({formErrors,...rest})=>{
  let valid = true;
  Object.values(formErrors).forEach(val=>{
    val.length>0 && (valid = false);
  });
  Object.values(rest).forEach(val=>{
    val===null && (valid = false);
  });


  return valid;
}

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      firstName:null,
      lastName:null,
      email:null,
      password:null,
      formErrors:{
        firstName:"",
        lastName:"",
        email:"",
        password:""
      }
    };
  }

  handleSubmit= e =>{
    e.preventDefault();

    if(formValid(this.state)){
      console.log(`
      --SUBMITTING--
      First Name:${this.state.firstName}
      Last Name:${this.state.lastName}
      Email:${this.state.email}
      Password:${this.state.password}
      `)
    }else{
      console.error("Invalid Form")
    }
  };
//condition we set for the change of events
  handleChange = e =>{
    e.preventDefault();
    const { name, value} = e.target;
    let formErrors = this.state.formErrors;

    switch(name){
      case "firstName":
        formErrors.firstName = value.length < 3  ?
        "Minimum of 3 characters required."
        : "";
        break;
      case "lastName":
        formErrors.lastName = value.length < 3  ?
        "Minimum of 3 characters required."
        : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)  ?
        ""
        : "Invalid Email address";
        break;
      case "password":
        formErrors.password = value.length < 6  ?
        "Minimum of 6 characters required."
        : "";
        break;
      default:
       break;
    }
      this.setState({formErrors,[name]: value}, () =>console.log(this.state))};

  render(){
    const {formErrors} = this.state;
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input
            className={formErrors.firstName.length > 0 ? "error" :null}
            placeholder="First Name"
            type="text"
            name="firstName"
            noValidate onChange={this.handleChange}/>
          </div>
          {formErrors.firstName.length > 0 && (
            <span className="errorMessage">{formErrors.firstName}</span>
          )}
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input
            className={formErrors.lastName.length > 0 ? "error" :null}
            placeholder="Last Name"
            type="text"
            name="lastName"
            noValidate onChange={this.handleChange}/>
          </div>
          {formErrors.lastName.length > 0 && (
            <span className="errorMessage">{formErrors.lastName}</span>
          )}
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
            className={formErrors.email.length > 0 ? "error" :null}
            placeholder="Email"
            type="email"
            name="email"
            noValidate onChange={this.handleChange}/>
          </div>
          {formErrors.email.length > 0 && (
            <span className="errorMessage">{formErrors.email}</span>
          )}
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
            className={formErrors.password.length > 0 ? "error" :null}
            placeholder="Password"
            type="password"
            name="password"
            noValidate onChange={this.handleChange}/>
          </div>
          {formErrors.password.length > 0 && (
            <span className="errorMessage">{formErrors.password}</span>
          )}
          <div className="createAccount">
            <button type="submit">Create Account.</button>
            <small>Already Have an Account?</small>
          </div>
        </form>
      </div>
    </div>
  );
}
}

export default App;

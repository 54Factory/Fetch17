import React from 'react';


const styles = {
  form: {
    marginBottom: 20,
  },
  input: {
    display: 'block',
    width: '100%',
    margin: '0 auto 10px auto',
    height: '42px',
    fontSize: 14,
    padding: 10,
    outline: 0,
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    height: '42px',
    border: 0,
    backgroundColor: '#7ED321',
 
  },
  successMessage: {
    backgroundColor: 'rgb(251, 161, 97)',
    padding: 10,
    width: 300,
    color: 'white',
    margin: '15px auto',
  },
  errorMessage: {
    backgroundColor: 'red',
    padding: 10,
    width: 300,
    color: 'white',
    margin: '15px auto',
  },
};

const SignInForm = ({
  onSubmit,
  loading,
  username,
  successMessage,
  errorMessage,
}) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      return onSubmit({
        username: formData.get('username'),
        password: formData.get('password')
      });
      
    }}
    style={styles.form}
  >
    <input
      type="text"
      name="username"
      placeholder="Username"
      defaultValue={username}
      style={styles.input}
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      style={styles.input}
      required
    />

    <div>
      <button
        style={styles.button}
        type="submit"
      >Log In
      </button>
    </div>

    <div>
      {loading && (
        <div style={{ margin: 20 }}>Signing In...</div>
      )}
{/* 
      {successMessage && (
        <div style={styles.successMessage}>{successMessage}</div>
      )} */}

      {errorMessage && (
        <div style={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  </form>
);

SignInForm.defaultProps = {
  loading: false,
  successMessage: '',
  errorMessage: '',
  username: '',
};

export default SignInForm;


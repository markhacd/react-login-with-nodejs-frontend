import React,{ useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from '../stores/UserStore';

export default () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const setInputValue = (property, val) => {
    val = val.trim();
    if(val.length > 12){
      return;
    }
    property(val);
  };

  const resetForm = () => {
    setUserName('');
    setPassword('');
    setButtonDisabled(false);
  };

  const doLogin = async () => {
    if(!userName){
      return;
    }
    if(!password){
      return;
    }

    setButtonDisabled(true);
    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          password: password
        })
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }else if (result && result.success === false) {
        resetForm();
        alert(result.msg);
      }

    } catch (e) {
      console.log(e);
      resetForm();
    }

  }
  return (
    <>
    <div className="col-md-6 offset-md-3 text-center">
      <h2>LogIn</h2>
      <InputField
        type='text'
        placeholder='Username'
        value={userName ? userName : ''}
        onChange={ (val) => setInputValue(setUserName,val) }
      />
      <InputField
        type='password'
        placeholder='Password'
        value={password ? password : ''}
        onChange={ (val) => setInputValue(setPassword,val) }
      />

      <SubmitButton
        text='Login'
        disabled={buttonDisabled}
        onClick={ () => doLogin() }
      />
    </div>
    </>
  );
};

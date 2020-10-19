import React, { useEffect } from 'react';
import { observer } from 'mobx-react'
import UserStore from './stores/UserStore';
import LoginFrom from './components/LoginForm';
import SubmitButton from './components/SubmitButton'
export default observer(() => {
  useEffect(() => {

    async function fetchData() {
      try {
        let res = await fetch('/isLoggedIn', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
  
        let result = await res.json();
  
        if (result && result.success) {
          UserStore.loading = false;
          UserStore.isLoggedIn = true;
          UserStore.username = result.username;
  
  
        } else {
          UserStore.loading = false;
          UserStore.isLoggedIn = false;
        }
  
      } catch (e) {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }
    fetchData();
  }, [])

  const doLogout = async () => {
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';


      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }

    } catch (e) {
      console.log(e);
    }
  }
  
  if(UserStore.loading){
    return (
      <>
      <div>
        Loading, please wait..
      </div>
      
      </>
    );
  } else {
    if (UserStore.isLoggedIn) {
      return (
        <>
        <div>
          Welcome { UserStore.username }
          <SubmitButton
          text={'Logout'}
          disabled={false}
          onClick={ () => doLogout() }
          />
        </div>
        
        </>
      );
    } else {
      
    }
    return (
      <>
      <div>
        <LoginFrom />
      </div>
      
      </>
    );
  }
  
});

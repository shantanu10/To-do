import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import Home from './screens/Home';
import OnboardingScreen from './screens/Onboarding';

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then(value => {
      if(value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true').then(value => {
          setFirstLaunch(true)
        })
        .catch(error => {
          console.log(error.message)
        })   
      }
      else
        setFirstLaunch(false)
      })
  }, [])

  if(firstLaunch === null)
    return null;
  if (firstLaunch)
    return <OnboardingScreen onDone={() =>  setFirstLaunch(false)}/>
  return <Home />
  
}



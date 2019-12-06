import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';

import { View, StyleSheet} from 'react-native';


export default function OnboardingScreen({ onDone }) {
  return (
    <View style={styles.main}>
        <Onboarding
            pages={[
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/onboarding.png')} width={Dimensions.get('window').width}/>,
                title: 'To Do App',
                subtitle: 'Made using Expo framework',
                },
            ]}
            onDone={onDone}

        />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  }
})
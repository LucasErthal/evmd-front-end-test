import React from 'react';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Details, Home } from '../screens';

// // const Stack = createStackNavigator();

// // const MyStack = () => (
// //   <Stack.Navigator>
// //     <Stack.Screen name="Home" component={Home} />
// //     <Stack.Screen name="Details" component={Details} />
// //   </Stack.Navigator>
// // );

// const Navigation = createStackNavigator({
//   Home,
//   Details,
// });

// export default createAppContainer(Navigation);


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Details"
        component={Details}
      />
    </Stack.Navigator>
  );
}

function Container() {
  return (
    <NavigationContainer>
    <MyStack />
  </NavigationContainer>
  );
}

export default Container;

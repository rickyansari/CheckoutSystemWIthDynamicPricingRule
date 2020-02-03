import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Basket from "app/containers/Basket";

const AppNavigator = createStackNavigator(
  {
    Basket  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);

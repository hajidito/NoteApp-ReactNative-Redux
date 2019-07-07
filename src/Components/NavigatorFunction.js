import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import Home from '../Screens/Home';
import AddNote from '../Screens/AddNote';
import EditNote from '../Screens/EditNote';
import ComponentDrawer from './ComponentDrawer';
import { Provider } from 'react-redux';
import store from '../publics/redux/store';

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  AddNote: {
    screen: AddNote,
  },
  EditNote: {
    screen: EditNote,
  },
});

const CustomDrawer = () =>(
    <ComponentDrawer/>
)

const AppDrawerNavigator = createDrawerNavigator({
  Home :{
    screen : AppStackNavigator,
    navigationOptions : {
      drawerLabel: () => null
    }
  },
},
  {contentComponent: CustomDrawer}
)

const AppContainerDrawer = createAppContainer(AppDrawerNavigator);

export default class App extends Component{
  render(){
    return(
      <Provider store={store} >
        <AppContainerDrawer/>
      </Provider>
    )
  }
}
import React,{Component} from "react";
import { View,Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logado from "./views/Logado";

import Login from "./views/Login";

const Stack = createNativeStackNavigator();

export default class App extends Component{
    render(){

        return( 
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Logado" component={Logado}/>
                </Stack.Navigator>
            </NavigationContainer>
           
        )
    }
}
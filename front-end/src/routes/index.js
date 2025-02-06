import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Welcome from '../screens/Welcome'
import SignIn from '../screens/Sign In'
import Register from '../screens/Register'
import HomeUser from '../screens/HomeUser'
import HomeADM from '../screens/HomeADM'
import Editor from '../screens/Editor'
import AddTask from '../screens/AddTask'


const Stack = createNativeStackNavigator();



export default function Routes(){

    return(
        <Stack.Navigator initialRouteName= {'Welcome'}>

            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="HomeUser"
                component={HomeUser}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="HomeADM"
                component={HomeADM}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Editor"
                component={Editor}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AddTask"
                component={AddTask}
                options={{headerShown: false}}
            />

        </Stack.Navigator>
    )
}
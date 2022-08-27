import React from "react";
import { Button, Text, View } from "react-native";
import getRealm from "../Components/realm";

const Login = (props)=>{
    // console.warn(Object.keys(props.navigation))
    let firstTask;
    const writeTask = async ()=>{
        const realm = await getRealm();

        try{
            realm.write(()=>{
                firstTask = realm.create("Users",{
                    _id:1,
                    usuario:"willian",
                    senha:"123",
                });
                
            })
        }catch(e){
            console.log(e)
        }
    }

    const getTask = async ()=>{
        const realm = await getRealm();

        try{
            const data = realm.objects("Users");
            console.log(data)
        }catch(e){
            console.log(e)
        }
    }


    return(
        <View>
            <Button
                title="write" onPress={writeTask}
            />
            <Button title="get" onPress={getTask}/>
            <Button title="go" onPress={async ()=>{
                const realm = await getRealm();
                try{
                    const u = realm.objects("Users").filtered("_id = 1")
                    if(u[0].usuario ==="willian"){
                        props.navigation.push("Logado")
                    }
                }catch(e){
                    console.log(e)
                }
            }}/>
        </View>
        
    )

}


export default Login;
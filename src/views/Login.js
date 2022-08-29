import React, { useState } from "react";
import { Alert, Button, TextInput, View, } from "react-native";
import getRealm from "../Components/realm";

const Login = (props)=>{
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")


    const writeTask = async ()=>{
        const realm = await getRealm();

        try{
            realm.write(()=>{
                realm.create("Users",{
                    _id:2,
                    usuario:"valter",
                    senha:"123",
                });
                
            })
        }catch(e){
            console.log(e)
        }finally{
            realm.close()
        }
    }

    const getTask = async ()=>{
        const realm = await getRealm();

        try{
            const data = realm.objects("Users");
            console.log(data)
        }catch(e){
            console.log(e)
        }finally{
            realm.close()
        }
    }

    const del = async ()=>{
        const realm = await getRealm();
        try{
            realm.write(()=>{
                realm.deleteAll()
            })
        }catch(e){
            console.log(e)
        }finally{
            realm.close()
        }
    }

    const verify = async ()=>{
        const realm = await getRealm();
            try{
                const u = realm.objects("Users").filtered(`usuario = "${user}" AND senha = "${password}"`)
                console.log(u)
                u.length!==0
                ?
                    props.navigation.push("Logado")
                :
                    Alert.alert("Usuário ou Senha incorreto!")
                
            }catch(e){
                console.log(e)
            }finally{
                realm.close()
                setPassword("")
                setUser("")
            }
    }

    return(
        <View>
            
            <TextInput
                style={{borderWidth:1,margin:10}}
                placeholder={"Usuario"}
                value={user}
                onChangeText={setUser}
            />
            <TextInput
                style={{borderWidth:1,margin:10}}
                placeholder={"Senha"}
                value={password}
                onChangeText={setPassword}
            />

            <Button title="write" onPress={writeTask}/>
            <Button title="get" onPress={getTask}/>
            <Button title="del" onPress={del}/>
            <Button title="go" onPress={verify}/>

        </View>
        
    )

}


export default Login;
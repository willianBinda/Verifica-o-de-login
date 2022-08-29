import React, { useState } from "react";
import { Alert, Button, Keyboard, TextInput, View, } from "react-native";
import getRealm from "../Components/realm";
import CryptoJs from 'react-native-crypto-js'
import { v4 as uuid } from "uuid";
import "react-native-get-random-values"



const Login = (props)=>{
    const [user,setUser] = useState("")
    const [senha,setSenha] = useState("")

    //criptografia

    const cryptografar = (senha)=>{
        const crypt = CryptoJs.AES.encrypt(
            senha,
            'secret key 123'
        ).toString();
        return crypt
    }

    const descriptografar = ()=>{
        const decript = CryptoJs.AES.decrypt (
            crypt,
            'secret key 123'
        )

        const originaltext = decript.toString(CryptoJs.enc.Utf8)

    }
    //criptografia

    const writeTask = async ()=>{
        const realm = await getRealm();

        try{
            realm.write(()=>{
                realm.create("Users",{
                    _id:uuid(),
                    usuario:user,
                    senha:cryptografar(senha)
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
                //.sorted pode ser util para organizar algo com preferência.
                const u = realm.objects("Users").filtered(`usuario = "${user}" AND senha = "${senha}"`)
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
                setSenha("")
                setUser("")
                Keyboard.dismiss()//aqui quando é pressionado o botao o teclado se fecha 
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
                value={senha}
                onChangeText={setSenha}
            />

            <Button title="write" onPress={writeTask}/>
            <Button title="get" onPress={getTask}/>
            <Button title="del" onPress={del}/>
            <Button title="go" onPress={verify}/>
            <Button title="crypto" onPress={cryptografar}/>

        </View>
        
    )

}


export default Login;
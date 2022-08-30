import React, { useState } from "react";
import { Alert, Button, Keyboard, TextInput, View, Text } from "react-native";
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


    const descriptografar = (criptografado)=>{
        const decript = CryptoJs.AES.decrypt (
            criptografado,
            'secret key 123'
        )
        const originaltext = decript.toString(CryptoJs.enc.Utf8)
        return originaltext
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
            setUser("")
            setSenha("")
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
                //
                const u = realm.objects("Users").filtered(`usuario = "${user}"`)
                console.log(u)
                const usuarioBanco = u[0].usuario
                const senhaBanco = u[0].senha
                const senha_descriptografada = descriptografar(senhaBanco)
                //

                senha === senha_descriptografada && usuarioBanco === user?
                    props.navigation.push("Logado")
                :
                    Alert.alert("Usuário ou Senha incorreto!")

                //.sorted pode ser util para organizar algo com preferência.
            }catch(e){
                console.log(e)
                Alert.alert("Usuário ou Senha incorreto!")
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


            <Text>{user}</Text>
            <Text>{senha}</Text>
        </View>
        
    )

}


export default Login;
import Realm from "realm";
import TaskSchema from "./Task";

const getRealm = async ()=>
    await Realm.open({
        path:"BancoTeste",
        schema:[TaskSchema],
    });

export default getRealm;

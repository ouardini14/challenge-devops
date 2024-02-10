import {  ref, deleteObject } from "firebase/storage";
import { storage } from "../../utils/firebase";

export async function  deleteBookStorage(id){
    const desertRef = ref(storage,`/Books/${id}/Cover`);
    const desertRef2 =  ref(storage, `/Books/${id}/BookUrl`);

    await  deleteObject(desertRef).then(async ()=>{
        return  await  deleteObject(desertRef2)
    })
}


import { useState } from "react";
import { storage } from '../../utils/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { async } from "@firebase/util";

export default async function uploadMedia(id,Cover,Book) {
    const Pic =Cover[0]
    const BookUrl =Book[0]

    
    const storageRef = ref(storage, `Books/${id}/Cover`);
    const storageRef2 = ref(storage, `Books/${id}/BookUrl`);

    const uploadTask =  Pic ?uploadBytesResumable(storageRef,Pic): null;
    const uploadTask2 = BookUrl ? uploadBytesResumable(storageRef2, BookUrl) : null ;
    
    return {uploadTask,uploadTask2}
   
  
}

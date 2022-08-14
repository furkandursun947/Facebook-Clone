import React, {useRef, useState} from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { CameraIcon, EmojiHappyIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { db, storage } from '../firebase';
import firebase from 'firebase';
const cors = require('cors')({origin: true});
function Inputbox() {
    const { data: session, status } = useSession();
    const InputRef = useRef(null);
    const filePickerRef = useRef(null);
    const [imageHolder, setImageHolder] = useState(null);

    const sendPost = async (e) => {
        e.preventDefault();
        if(!InputRef.current.value) return;
        await db.collection('posts').add({
            message: InputRef.current?.value,
            name: session.user.name,
            image: session.user.image,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(doc => {
            if (imageHolder) {
                const uploadTask = storage.ref(`posts/${doc.id}`).putString(imageHolder, 'data_url')
                removeImage();

        
                uploadTask.on('state_change', null, error => console.log(error), () => {
                    storage.ref(`posts`).child(doc.id).getDownloadURL().then(url  => {
                        db.collection('posts').doc(doc.id).set({
                            postImage: url
                        }, {merge: true})
                    })
                })
            }
        })
        InputRef.current.value = "";
    }

    const addImageToPost = (e) => {
        const reader = new FileReader()
        if(e.target.files[0])
        {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setImageHolder(readerEvent.target.result)
        }
    }

    const getImage = () => {
        filePickerRef.current.click();
    }

    const removeImage = () => {
        setImageHolder(null);
    }

    return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
        <div className='flex space-x-4 p-4 items-center'>
            <Image
            className='rounded-full'
            src={session.user.image}
            width="40"
            height="40"
            alt="meImage"
            layout='fixed'
            />
            <form className='flex flex-1'>
                <input ref={InputRef} className='rounded-full bg-gray-100 flex-grow px-5 focus:outline-none' type={"text"} placeholder={`What's on your mind ${session.user.name}`} />
                <button hidden onClick={sendPost} type="submit">Submit</button>

            </form>
            {imageHolder && (
                <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                    <img src={imageHolder} alt="imageUploaded" className='h-10 object-contain'/>  
                    <p className='text-xs text-red-500 text-center'>Remove</p>
                </div>
            )}
        </div>
        <div className='flex justify-evenly p-3 border-t'>
            <div className='inputIcon'>
                <VideoCameraIcon className='h-7 text-red-500' />
                <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
            </div>
            <div onClick={getImage} className='inputIcon'>
                <CameraIcon className='h-7 text-green-400' />
                <p className='text-xs sm:text-sm xl:text-base'>Photo Video</p>
                <input ref={filePickerRef} type="file" hidden onChange={addImageToPost}/>
            </div>
            <div className='inputIcon'>
            <EmojiHappyIcon className='h-7 text-yellow-300' />
                <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
            </div>
        </div>
    </div>
  )
}

export default Inputbox
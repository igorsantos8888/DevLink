import { useEffect, useState } from 'react'
import './index.css'
import { Header } from '../../components/Header'
import { Input } from '../../components/input'
import { MdAddLink } from 'react-icons/md'
import { db } from '../../services/firebaseConnection'
import { toast } from 'react-toastify'
import {
    setDoc,
    doc,getDoc
} from 'firebase/firestore'

export default function Networks() {

    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, 'social', 'link')

            getDoc(docRef) 
            .then( (snapshot) => {
                
                if(snapshot.data() !== undefined) {
                    setFacebook(snapshot.data().facebook)
                    setInstagram(snapshot.data().instagram)
                    setYoutube(snapshot.data().youtube)
                }

            })
        }
        loadLinks()
    }, [])

    function handleSave(e) {
        e.preventDefault()

        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube,
        })
        .then(() => {
            toast.success('Link salvo com sucesso')
        })
        .catch((err) => {
            toast.error('Ocorreu um erro ao salvar o link ' + err )
        })
    }

    return (
        <div className='admin-container'>
            <Header/>

            <h1 className='title-social'>Suas Redes Sociais</h1>

            <form className='form' onSubmit={handleSave}>
                <label className='label'>Link do Facebook</label>
                <Input
                    placeholder="Digite a url do facebook..."
                    value={facebook}
                    onChange={(e) => {
                        setFacebook(e.target.value)
                    }}
                />
                <label className='label'>Link do Instagram</label>
                <Input
                    placeholder="Digite a url do Instagram..."
                    value={instagram}
                    onChange={(e) => {
                        setInstagram(e.target.value)
                    }}
                />
                <label className='label'>Link do YouTube</label>
                <Input
                    placeholder="Digite a url do YouTube..."
                    value={youtube}
                    onChange={(e) => {
                        setYoutube(e.target.value)
                    }}
                />
                <button type='submit' className='btn-register'>
                    Salvar Links <MdAddLink/>
                </button>
            </form>

        </div>
        
    )
}
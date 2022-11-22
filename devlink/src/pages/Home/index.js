/* eslint-disable jsx-a11y/anchor-is-valid */
import './home.css'
import { useState, useEffect } from 'react'
import { Social } from '../../components/Social'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'


export default function Home() {

    const [links, setLinks] = useState([])
    const [socialLinks, setSocialLinks] = useState([])

    useEffect(() => {

        function loadLinks() {
            const linksRef = collection(db, 'links')
            const queryRef = query(linksRef, orderBy("create", "asc"))

            getDocs(queryRef)
                .then((snapshot) => {
                    let lista = []

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            name: doc.data().name,
                            url: doc.data().url,
                            bg: doc.data().bg,
                            color: doc.data().color,
                        })
                    })
                    setLinks(lista)
                })
        }
        loadLinks()
    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setSocialLinks({
                            facebook: snapshot.data().facebook,
                            instagram: snapshot.data().instagram,
                            youtube: snapshot.data().youtube
                        })
                    }
                })
        }
        loadSocialLinks()
    }, [])

    return (
        <div className='home-container'>
            <h1>Sujeito Programador</h1>
            <span>Veja os meus links 👇</span>

            <main className='links'>

                {
                    links.map((item) => (
                        <section key={item.id} className='link-area' style={{ backgroundColor: item.bg }}>
                            <a href={item.url}>
                                <p className='link-text' style={{ color: item.color }}>
                                    {item.name}

                                </p>
                            </a>
                        </section>
                    ))
                }

                {
                    links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                        <footer>
                            <Social url={socialLinks?.facebook}>
                                <FaFacebook size={35} color="#fff" />
                            </Social>
                            <Social url={socialLinks?.instagram}>
                                <FaInstagram size={35} color="#fff" />
                            </Social>
                            <Social url={socialLinks?.youtube}>
                                <FaYoutube size={35} color="#fff" />
                            </Social>
                        </footer>
                    )
                }
            </main>
        </div>
    )
}
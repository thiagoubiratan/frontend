import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'
import logoImg from '../../../public/logo.svg'
import Input from '../../components/iu/Input/index'
import { Button } from '../../components/iu/Button/index'
import Link from 'next/link'
import { FormEvent, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContex'
import { toast } from 'react-toastify'

export default function SignUp() {
    const { signUp } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast.warning("preencha todos os campos");
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password
        }

        await signUp(data);

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Chef Restô - Faça seu cadastro agora</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo"></Image>

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSignUp}>
                        <Input placeholder='Digite seu Nome' type='text' value={name} onChange={(e) => setName(e.target.value)}></Input>
                        <Input placeholder='Digite seu email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                        <Input placeholder='Sua senha' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                        <Button type='submit' Loading={loading}>Cadastrar</Button>
                    </form>

                    <Link className={styles.text} href="/">
                        Já possui uma conta? Faça login!
                    </Link>

                </div>
            </div>
        </>
    );
}
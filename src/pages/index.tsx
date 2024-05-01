import { useContext, FormEvent, useState } from 'react'
import { Button } from '../components/iu/Button/index'
import { AuthContext } from '../contexts/AuthContex'

import Head from 'next/head'
import logoImg from '../../public/logo.svg'
import styles from '../../styles/home.module.scss'
import Image from 'next/image'
import Input from '../components/iu/Input/index'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlerLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warning("preencha todos os campos");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    signIn(data)

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Chef Restô - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo"></Image>

        <div className={styles.login}>
          <form onSubmit={handlerLogin}>
            <Input placeholder='Digite seu email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
            <Input placeholder='Sua senha' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
            <Button type='submit' Loading={loading}>Acessar</Button>
          </form>

          <Link className={styles.text} href="/signup">
            Não possui uma conta? Cadastre-se
          </Link>

        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})

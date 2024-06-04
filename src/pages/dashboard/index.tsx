import Head from 'next/head'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'
import { useState } from 'react'
import Modal from 'react-modal'
import { ModalOrder } from '../../components/modalOrder'

type OrderProps = {
    id: number;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

export type OrderItemProps = {
    id: number;
    amount: number;
    order_id: number;
    product_id: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: string;
        banner: string
    }
    order: {
        id: number;
        table: number;
        status: boolean;
        name: string;
    }
}

interface HomeProps {
    orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps) {
    const [orderList, setOrderList] = useState(orders || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function hadlerCloseModel() {
        setModalVisible(false);
    }

    async function handlerOpenModalView(id: number) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id,
            }
        });

        setModalItem(response.data);
        setModalVisible(true);
    }

    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>Painel - Chef Restô</title>
            </Head>
            <div>
                <Header></Header>
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color="#3fffa3"></FiRefreshCcw>
                        </button>
                    </div>
                    <article className={styles.listOrders}>
                        {orderList.map(item => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={() => handlerOpenModalView(item.id)}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}


                    </article>
                </main>

                {modalVisible && (
                    <ModalOrder
                        isOpen={modalVisible}
                        onRequestClose={hadlerCloseModel}
                        order={modalItem}>
                    </ModalOrder>
                )}

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/orders');

    return {
        props: {
            orders: response.data
        }
    }
})
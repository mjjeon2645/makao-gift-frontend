import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router-dom';

import OrderForm from '../components/OrderForm';

import useOrderStore from '../hooks/useOrderStore';
import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';

export default function OrderPage() {
  const productStore = useProductStore();
  const orderStore = useOrderStore();
  const userStore = useUserStore();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const location = useLocation();

  const { id } = location.state;

  useEffect(() => {
    productStore.fetchProduct(id);
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { receiver, address, message } = data;

    const productId = productStore.product.id;

    const { volume, totalPrice } = productStore;

    await orderStore.order({
      receiver, address, message, productId, volume, totalPrice,
    });

    userStore.fetchBalance();

    navigate('/orders');
  };

  return (
    <OrderForm
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      productStore={productStore}
    />
  );
}

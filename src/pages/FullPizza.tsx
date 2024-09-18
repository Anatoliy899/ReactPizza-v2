import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//@ts-ignore
const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://666826aff53957909ff6cc5c.mockapi.io/items/' + id
        );

        setPizza(data);
      } catch (error) {
        alert('Ошибка при прлучении пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>

      <h3>{pizza.price} руб.</h3>
    </div>
  );
};

export default FullPizza;

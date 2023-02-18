import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./ItemsPage.scss";

export default function ItemsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryQuery = searchParams.get("category");
  const url = process.env.REACT_APP_API_URL;

  const [itemList, setItemList] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const getList = async () => {
      try {
        const { data } = await axios.get(`${url}/items/?search=${searchQuery}`);
        setItemList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [searchQuery, url]);

  useEffect(() => {
    if (!categoryQuery) {
      return;
    }

    const getList = async () => {
      try {
        const { data } = await axios.get(
          `${url}/items/?category=${categoryQuery}`
        );
        setItemList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [categoryQuery, url]);

  return (
    <main className="itemsPage">
      {itemList &&
        itemList.map((item) => {
          return <ItemCard key={item.id} item={item} />;
        })}
    </main>
  );
}

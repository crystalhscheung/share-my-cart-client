import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./ItemsPage.scss";

export default function ItemsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryQuery = searchParams.get("category");

  const [itemList, setItemList] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const getList = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/items/?search=${searchQuery}`
        );
        setItemList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [searchQuery]);

  useEffect(() => {
    if (!categoryQuery) {
      return;
    }
    console.log(categoryQuery);
    const getList = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/items/?category=${categoryQuery}`
        );
        setItemList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [categoryQuery]);

  return (
    <main className="itemsPage">
      {itemList &&
        itemList.map((item) => {
          return <ItemCard key={item.id} item={item} />;
        })}
    </main>
  );
}

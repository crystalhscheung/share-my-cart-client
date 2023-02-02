import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./ItemsPage.scss";

export default function ItemsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const [itemList, setItemList] = useState(null);

  useEffect(() => {
    const getList = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/items/?search=${query}`
      );
      setItemList(data);
    };
    getList();
  }, [query]);

  return (
    <main>
      {itemList &&
        itemList.map((item) => {
          return <ItemCard key={item.id} item={item} />;
        })}
    </main>
  );
}

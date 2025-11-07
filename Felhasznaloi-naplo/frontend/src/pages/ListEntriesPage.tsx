import { useEffect, useState } from "react";
import type { EntryModel } from "../models/EntryModel";
import apiClient from "../api/apiClient";
import EntryComponent from "../Components/EntryComponent";
import { useNavigate } from "react-router";

const ListEntriesPage = () => {
  const [entries, setEntries] = useState<EntryModel[]>([]);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate()
  useEffect(() => {
    apiClient
      .get(`/entries/${userId}`)
      .then((res) => {
        setEntries(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div>
        <button onClick={() => navigate("/entry")}> Feljegyzés hozzáadása </button>
        {entries.length !== 0 ? (<>
          
          {entries.map((entry) => (<EntryComponent content={entry.content} title={entry.title} createdAt={entry.createdAt} id={entry.id} userId={entry.userId}/>))}</>
        ) : (
          <>
          
            <h1>Nincs feljegyzés!</h1>
          </>
        )}
      </div>
    </>
  );
};

export default ListEntriesPage;

import { useEffect, useState } from "react";
import type { EntryModel } from "../models/EntryModel";
import { useNavigate } from "react-router";
import apiClient from "../api/apiClient.ts";

const ListEntriesPage = () => {
  const [dbEntries, setDbEntries] = useState<EntryModel[]>([]);
  const [entries, setEntries] = useState<EntryModel[]>([]);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    loadEntries();
    setAppTheme();
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      FilterEntries();
    } else {
      setEntries(dbEntries);
    }
  }, [search, dbEntries]);

  const FilterEntries = () => {
    setEntries(
      dbEntries.filter(
        (entry) =>
          entry.content.includes(search) || entry.title.includes(search)
      )
    );
  };

  const loadEntries = () => {
    const userId = sessionStorage.getItem("userId")
    apiClient
    .get(`/entries/${userId}`)
    .then((res) => {
      setDbEntries(res.data);
      setEntries(res.data)
    })
    .catch((e) => console.log(e));

  };

  const deleteEntry = (id: number) => {
    if (confirm("Biztos törli?")) {
      apiClient
    .delete(`/entry/${id}`)
    .then(() => {
      alert("Sikeresen törölve lett.");
    })
    .catch((e) => console.log(e));
      loadEntries();
    }
  };

  const setAppTheme = () => {
    let theme = localStorage.getItem("theme");
    if (!theme) {
      theme = "light";
    }
    if (theme == "light") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  return (
    <>
      <div>
        <button
          className="passwordHideButton"
          id="settingButton"
          onClick={() => {
            navigate("/settings");
          }}
        >
          <i className="material-icons ">settings</i>
        </button>
        <div className="inputField">
          <h2>Keresés</h2>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="keresés"
          />
        </div>
        <button
          className="buttons"
          id="entryAddButton"
          onClick={() => navigate("/entry")}
        >
          {" "}
          Feljegyzés hozzáadása{" "}
        </button>
        {entries.length !== 0 ? (
          <>
            {entries.map((entry) => (
              <div key={entry.title} className="entryItem">
                <h2>{entry.title}</h2>
                <p>{entry.content}</p>
                <div>
                  <p>{entry.createdAt?.replace("T", " ").split(".")[0]}</p>
                  <button
                    className="passwordHideButton"
                    onClick={() => navigate(`/entry/${entry.id}`)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="passwordHideButton"
                    onClick={() => deleteEntry(Number(entry!.id))}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </div>
              </div>
            ))}
          </>
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

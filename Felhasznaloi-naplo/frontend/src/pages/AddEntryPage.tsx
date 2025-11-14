import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { EntryModel } from "../models/EntryModel";
import apiClient from "../api/apiClient";

const AddEntryPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>();
  const [entry, setEntry] = useState<EntryModel>();

  const navigate = useNavigate();
  useEffect(() => {
    setAppTheme();
  }, []);
  useEffect(() => {
    if (id) {
      apiClient
          .get(`/entry/${id}`)
          .then((res) => {
            setEntry(res.data);
          })
          .catch((e) => console.log(e));
    }
  }, [id]);

  useEffect(() => {
    if (entry) {
      setTitle(entry!.title);
      setContent(entry!.content);
    }
  }, [entry]);

  const save = () => {
    setTitle(title.trim());
    setContent(content.trim());
    if (title.length == 0 && content.length == 0) {
      setError("Adj meg címet és tartalmat");
      return;
    } else if (title.length == 0) {
      setError("Adj meg címet");
      return;
    } else if (content.length == 0) {
      setError("Adj meg tartalmat");
      return;
    }
    const userId:number = Number(sessionStorage.getItem("userId"))
    const entry: EntryModel = { title, content, userId };
    apiClient
    .post("/entry", entry)
    .then(() => {
      {
        alert("Sikeresen létrehozva");
        navigate("/entry/list");
      }
    })
    .catch((e) => {
      if (e.status == 500) {
        setError("Ilyen cím már létezik");
      }
    });
  };

  const update = () => {
    setTitle(title.trim());
    setContent(content.trim());
    if (title.length == 0 && content.length == 0) {
      setError("Adj meg címet és tartalmat");
      return;
    } else if (title.length == 0) {
      setError("Adj meg címet");
      return;
    } else if (content.length == 0) {
      setError("Adj meg tartalmat");
      return;
    }

    const updatedEntry: EntryModel = entry!;
    updatedEntry.content = content;
    updatedEntry.title = title;
    apiClient
    .patch(`/entry/${updatedEntry.id}`, updatedEntry)
    .then(() => {
      {
        alert("Sikeresen módosítva");
        navigate("/entry/list");
      }
    })
    .catch((e) => console.log(e));
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
        <div className="inputField">
          <h2>Cím</h2>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="inputField">
          <h2>Tartalom</h2>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </div>
        <div className="buttonCollection">
          <button onClick={() => navigate("/entry/list")} className="buttons">
            Vissza
          </button>
          {!entry ? (
            <>
              <button onClick={save} className="buttons">
                Mentés
              </button>
            </>
          ) : (
            <>
              <button onClick={update} className="buttons">
                Módosítás
              </button>
            </>
          )}
        </div>
        <p>{error}</p>
      </div>
    </>
  );
};

export default AddEntryPage;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { EntryModel } from "../models/EntryModel";
import apiClient from "../api/apiClient";

const AddEntryPage = () => {
    const {id} = useParams()
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>();
    const[entry, setEntry] = useState<EntryModel>();

  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get(`/entry/${id}`).then((res) => {setEntry(res.data)
        setTitle(entry!.title)
        setContent(entry!.content)
    }).catch((e) => console.log(e))
  }, [id])

  const save = () => {
    setTitle(title.trim())
    setContent(content.trim())
    if (title.length == 0 && content.length == 0) {
      setError("Adj meg címet és tartalmat");
      return;
    } else if (title.length == 0) {
      setError("Adj meg címet");
      return;}
      else if (content.length == 0) {
      setError("Adj meg tartalmat");
      return;}
      const userId = Number(sessionStorage.getItem("userId"))
    const entry: EntryModel = { title, content, userId };
    apiClient
      .post("/entry", entry)
      .then((respone) => {
         {
            alert("Sikeresen létrehozva")
          navigate("/entry/list");
        }
      })
      .catch((e) => console.log(e));
  };

  const update = () => {
    setTitle(title.trim())
    setContent(content.trim())
    if (title.length == 0 && content.length == 0) {
      setError("Adj meg címet és tartalmat");
      return;
    } else if (title.length == 0) {
      setError("Adj meg címet");
      return;}
      else if (content.length == 0) {
      setError("Adj meg tartalmat");
      return;}
const userId : number = entry!.userId
const updatedEntry : EntryModel = {title, content , userId}
    setEntry(updatedEntry)
    apiClient
      .patch(`/entry/${id}`, updatedEntry)
      .then((respone) => {
         {
            alert("Sikeresen módosítva")
          navigate("/entry/list");
        }
      })
      .catch((e) => console.log(e));
  };
  
  return (
    <>
      <div>
        <h2>Cím</h2>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
        <h2>Name</h2>
        <textarea onChange={(e) => setContent(e.target.value)} value={content} ></textarea>
        <button onClick={() => navigate("/entry/list")}>Vissza</button>
        {!entry ? (<><button onClick={save}>Mentés</button></>): (<><button onClick={update}>Módosítás</button></>)}
        <p>{error}</p>
      </div>
    </>
  );
}

export default AddEntryPage
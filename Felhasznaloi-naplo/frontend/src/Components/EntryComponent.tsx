import { useNavigate } from "react-router";
import apiClient from "../api/apiClient";
import type { EntryModel } from "../models/EntryModel";

const EntryComponent = (entry: EntryModel) => {
  const navigate = useNavigate();

  const deleteEntry = () => {
    if (confirm("Biztos törli?")) {
      apiClient
        .delete(`/entry/${entry.id}`)
        .then(() => {
          alert("Sikeresen törölve lett.");
          window.location.reload();
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      {!entry ? (
        <></>
      ) : (
        <>
          <h2>{entry.title}</h2>
          <p>{entry.content}</p>
          <div>
            <p>{entry.createdAt?.replace("T", " ").split(".")[0]}</p>
            <button onClick={() => navigate(`/entry/${entry.id}`)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button onClick={deleteEntry}>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default EntryComponent;

import { resolveTlsa } from "dns";
import express from "express";
const books = [{ id: 1, title: "alma", author: "Béla" }];

const app = express();
app.use(express.json());

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  let resbook;
  books.forEach((book) => {
    if (book.id == req.params.id) {
      resbook = book;
    }
  });
  if (!resbook) {
    return res.status(404).json({ message: "book not found" });
  }
  res.status(200).json(resbook);
});

app.post("/books", (req, res) => {
  const { id, title, author } = req.body;
  if (!id || !title || !author) {
    return res.status(404).json({ message: "invalid Data" });
  }
  const newBook = { id: id, title: title, author: author };
  books.push(newBook);
  res.status(200).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;
  if (!id || !title || !author) {
    return res.status(404).json({ message: "invalid Data" });
  }
  let selectedbookid;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books[i] = { id: books[i].id, title: title, author: author };
      selectedbookid = i;
    }
  }
  res.status(200).json(books[selectedbookid]);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  let selectedbookid;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      selectedbookid = i;
    }
  }
  if (!resbook) {
    return res.status(404).json({ message: "resbook not found" });
  }
  books.splice(selectedbookid, 1);
  return res.status(200).json({message: "Delete successful" })
});

app.listen(3000, () => {
  console.log("Server runs on port 3000");
});

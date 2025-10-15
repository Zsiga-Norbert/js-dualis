import express from "express";

const books = [{ id: 1, name: "sajt" }];

const port = 5000;
const app = express();

app.use(express.json());

app.get("/api/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/api/books/:id", (req, res) => {
  const id = req.params.id;

  const book = books.find((b) => b.id == id);
  if (!book) {
    return res.status(404).json({ message: "book not found" });
  }

  res.status(200).json(book);
});

app.post("/api/books", (req, res) => {
  const name = req.body;
  if (!name) {
    return res.status(400).json({ message: "invalid name" });
  }
  const book = { id: books[books.length - 1].id + 1, name };
  books.push(book);
  res.status(201).json(book.id);
});

app.put("/api/books/:id", (req, res) => {
  const id = req.params.id;

  const book = books.find((b) => b.id == id);

  if (!book) {
    return res.status(404).json({ message: "book not found" });
  }
  const bookIndex = books.findIndex((b) => b == book)
  const name = req.body;
  if (!name) {
    return res.status(400).json({ message: "invalid name" });
  }
  book = { id: book.id, name };
  books[bookIndex] = book;
  res.status(200).json(books[bookIndex]);
});

app.delete("/api/books/:id", (req, res) => {
  const id = req.params.id;

  const bookIndex = books.findIndex((b) => b.id == id);
  if (!bookIndex) {
    return res.status(404).json({ message: "book not found" });
  }

  books.splice(bookIndex, 1)

  res.status(200).json({message: "Deleted"});
});

app.listen(port, `${port}-on fut a szerver`);

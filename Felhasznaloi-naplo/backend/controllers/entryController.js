import * as entries from "../util/entry.js";

export const getEntryById = (req, res) => {
  const id = +req.params.id;
  const entriesRes = entries.getEntryById(id);
  if (!entriesRes) {
    return res.status(404).json({ message: "entries not found" });
  }
  res.status(200).json(entriesRes);
};

export const getEntriesByUserId = (req, res) => {
  const userId = req.params.userId;
  const entriesRes = entries.getEntriesByUserId(userId);
  if (!entriesRes) {
    return res.status(404).json({ message: "entries not found" });
  }
  res.status(200).json(entriesRes);
};

export const saveEntry = (req, res) => {
  const userId = req.params.userId;
  const {title, content } = req.body;
  if (!userId || !title || !content) {
    return res.status(400).json({ message: "missing data" });
  }
  const createdAt = new Date().toISOString();
  const result = entries.saveEntry(userId, title, content, createdAt);
  res.status(201).json(result.lastInsertRowid);
};

export const patchEntry = (req, res) => {
  const id = +req.params.id;
  const entry = entries.getEntryById(id);
  if (!entry) {
    return res.status(404).json({ message: "Entry not found" });
  }
  const { title, content } = req.body;

  const result = entries.updateEntry(id, title || entry.title, content || entry.content);
  if(result.changes > 0)
  {
      res.status(200).json({ message: "Updated" });
  }
};

export const deleteEntry = (req, res) => {
  const id = +req.params.id;
  const result = entries.deleteEntry(id);
  if(result.changes > 0)
  {
      res.status(204).json({message: "deleted"});
  }
  else
  {
    res.status(404).json({ message: "Entry not found" })
  }
};

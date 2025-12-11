CREATE TRIGGER posts_au AFTER UPDATE ON posts BEGIN
  UPDATE posts_fts
  SET title = new.title,
      content = new.content
  WHERE rowid = new.id;
END;

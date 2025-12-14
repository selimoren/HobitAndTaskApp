import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase(
  { name: "mydb.db", location: "default" },
  () => console.log("DB opened"),
  err => console.log("DB Error: ", err)
);

export default db;

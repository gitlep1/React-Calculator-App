const app = require("./app");
const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`React calculator app listening on port ${PORT}`);
});

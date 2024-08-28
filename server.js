// import express from "express";

// const app = express();
// const port = 8080;

// app.get("/",(req,res)=> {
//   res.send(index.html);
// })

// app.listen((port),(error)=> {
//   if(!error){
//     console.log(`we listening at ${port} bruv`);
//   }else{
//     console.log(`nah we got an error : ${error}`)
//   }
// })

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`We listening at ${port} bruv`);
  } else {
    console.log(`Nah we got an error: ${error}`);
  }
});
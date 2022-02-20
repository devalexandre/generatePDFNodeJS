const polka = require('polka');
const { json } = require("@polka/parse");
const pdf = require('html-pdf')

const PORT = process.env.PORT || 3000;

polka()
.use(json())
.get("/", (req, res) => {
  res.end("Hello World!")
})
.post("/generate",(req,res)=>{

	const { html } = req.body

  const options = {
        type: 'pdf',
        format: 'A4',
        orientation: 'portrait'
    }

    pdf.create(html, options).toBuffer((err, buffer) => {
        if(err) return res.status(500).json(err)
        
        res.end(buffer)               
    })

})
.listen(PORT,()=>{
    console.log("listening on port 3000");
})

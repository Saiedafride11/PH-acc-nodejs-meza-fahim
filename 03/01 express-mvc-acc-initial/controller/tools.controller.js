module.exports.getAllTools = (req, res , next) => {
      const {ip, query, params, body, headers} = req;
      
      //express download methods
      // res.download(__dirname + "/tools.controller.js")
      // res.sendFile
      // res.json({ "name": "abc"})
      // res.redirect("/login")

      // res.send("tools found");
}

module.exports.saveATools = (req, res, next) => {
      res.send("tools added successfully")
}

module.exports.getToolDetail = (req, res, next) => {
      res.send("tool details found")
}


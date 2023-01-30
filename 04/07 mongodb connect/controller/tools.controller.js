const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

let tools = [
            { id: 1, name: "Hammer" },
            { id: 2, name: "Hammer2" },
            { id: 3, name: "Hammer3" },
      ];
   
module.exports.getAllTools = async (req, res , next) => {
      // const {limit, page} = req.query;
      // console.log(limit, page);
      // // res.send(tools);
      // res.send(tools.slice(0, limit));


      try{
            const { limit, page } = req.query;
            const db = getDb();

            // cursor => toArray(), forEach()
            // const tool = await db.collection("tools").find().toArray();
            // const tool = await db.collection("tools").find().skip(1).limit(1).toArray();
            // const tool = await db.collection("tools").find({}).project({ _id: 0}).skip(1).limit(1).toArray();
            const tool = await db
                              .collection("tools")
                              .find({})
                              .project({ _id: 0})
                              .skip(+page * limit)
                              .limit(+limit)
                              .toArray();

            console.log(tools)
            res.status(200).json({ success: true, data: tool})
      } catch(error){
            next(error);
      }
}

module.exports.saveATools = async (req, res, next) => {
      // tools.push(req.body);
      // // console.log(req.body)
      // console.log(req.body, tools);
      // res.send("Tools added successfully");

      try{
            const db = getDb();
            const tool = req.body;
      
            const result = await db.collection("tools").insertOne(tool);
            console.log(result);

            if(!result.insertedId){
                  return res.status(404).send({ status: false, error: "Something went wrong" });
            }
            
            res.send({
                  success: true,
                  message: `Tool added with id: ${result.insertedId}`
            });
            
      } catch(error){
            next(error);
      }
}

module.exports.getToolDetail = async (req, res, next) => {
      // const {id} = req.params;
      // // console.log(id)
      // // res.send("tool details found")

      // // const filter = {_id: id};
      // const foundTool = tools.find(tool => tool.id == id);
      // res.send(foundTool);

      // res.status(200).send({
      //       success: true,
      //       message: "Success!",
      //       data: foundTool
      // });

      // res.status(500).send({
      //       success: false,
      //       message: "Internal server error"
      // })

      try{
            const db = getDb();
            const { id } = req.params;

            // id ta object id kina
            if(!ObjectId.isValid(id)){
                  return res.status(400).json({ success: false, error: "Not a valid id"})
            }

            const tool = await db.collection("tools").findOne({ _id: ObjectId(id)});

            if(!tool){
                  return res.status(404).json({ success: false, error: "Not a valid tool id"})
            }

            res.status(200).json({ success: true, data: tool});


      } catch(error){
            next(error);
      }
}

module.exports.updateTool = async (req, res, next) => {
      // // const newData = req.body;
      // const {id} = req.params;
      // // const filter = {_id: id};

      // const newData = tools.find(tool => tool.id === Number(id));

      // newData.id = id;
      // newData.name = req.body.name;

      // res.send(newData);


      try{
            const db = getDb();
            const { id } = req.params;

            // id ta object id kina
            if(!ObjectId.isValid(id)){
                  return res.status(400).json({ success: false, error: "Not a valid id"})
            }

            const tool = await db.collection("tools").updateOne({ _id: ObjectId(id)}, { $set: req.body });

            if(!tool.modifiedCount){
                  return res.status(404).json({ success: false, error: "Could't update the tool"})
            }

            res.status(200).json({ success: true, message: "Successfully updated the tool"});


      } catch(error){
            next(error);
      }
}

module.exports.deleteTool = async(req, res, next) => {
      // const {id} = req.params;
      // // const filter = {_id: id};

      // tools = tools.find(tool => tool.id !== Number(id));
      // res.send(tools);


      try{
            const db = getDb();
            const { id } = req.params;

            // id ta object id kina
            if(!ObjectId.isValid(id)){
                  return res.status(400).json({ success: false, error: "Not a valid id"})
            }

            const tool = await db.collection("tools").deleteOne({ _id: ObjectId(id)});

            if(!tool.deletedCount){
                  return res.status(404).json({ success: false, error: "Could't delete the tool"})
            }

            res.status(200).json({ success: true, message: "Successfully delete the tool"});


      } catch(error){
            next(error);
      }
}


module.exports.test = async(req, res, next) => {
      for (let i = 0; i < 100000; i++) {
        const db = getDb();
        db.collection("test").insertOne({name: `test ${i}`, age: i });
      }
};
module.exports.testGet = async(req, res, next) => {
      const db = getDb();
    
      const result = await db.collection("test").find({ name: "test 99999" }).toArray();
      res.json(result);
};


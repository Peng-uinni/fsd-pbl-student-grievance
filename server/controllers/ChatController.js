const Chat = require('../models/Chat');

exports.getComplaintChat = async (req, res) => {
  const complaintId = req.params.id;
  console.log("[GET /api/chat/complaint/"+complaintId+"]");

  try{
    const chat = await Chat.findOne({complaintId});

    res.status(200).json({
      success: true,
      count: chat.logs.length,
      body: chat.logs,
    })
  }catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

exports.createComplaintChat = async (req, res) => {
  const complaintId = req.params.id;
  newLog = {...req.body, createdAt: Date.now()};
  try{
    const complaint = await Chat.findOneAndUpdate({complaintId}, {$push: {logs: newLog}});

    res.status(201).json({
      success: true,
      msg: complaint,
    })
  } catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
}

exports.deleteComplaintChat = async (req, res) => {
  res.send("Not implemented");
}
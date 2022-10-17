import EntryKey from '../Models/EntryKey.js'
import User from '../Models/UserSchema.js'

const GetAllUser = async (req, res, next) => {
  await User.find()
    .then((result) => {
      res.status(200).json({
        Users: result,
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
      })
    })
}

const DeleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({ msg: 'user not found' })
  }

  await user.remove()

  res.status(200).json({ msg: 'user has been removed' })
}

const UpdateUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  const { AlowedToAttemptQuiz, role } = req.body
  if (!user) {
    return res.status(404).json({ msg: 'No User Found' })
  }
  await User.findByIdAndUpdate(req.params.id, { AlowedToAttemptQuiz, role })
    .then((result) => {
      res.status(200).json({ msg: 'User Updated Successfully' })
    })
    .catch((err) => {
      res.status(500).json({ msg: err })
    })
}

const AddEntryKey = async (req, res) => {
  await EntryKey.create(req.body)
    .then((result) => {
      res.status(201).json({
        Key: result,
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
      })
    })
}

const DeleteKey = async (req, res) => {
  const key = await EntryKey.findById(req.params.id)

  await key.remove().then(() => {
    res.status(200).json({ success: true })
  })
}

const EditKey = async (req, res) => {
  const key = await EntryKey.findById(req.params.id)
  if (!key) {
    res.status(500).json({ msg: 'Key Not Found' })
  }
  await EntryKey.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json({ success: true })
    })
    .catch((err) => {
      res.status(500).json({ err })
    })
}

const getKey = async (req, res) => {
  const { Key, subject } = req.body
  const key = await EntryKey.findOne({ Key })

  if (key.Key != Key || key.subject != subject) {
    return res.status(500).json({
      msg: "key doesn't match",
    })
  }

  res.status(200).json({
    msg: 'Entry Accepted',
  })
}

export {
  GetAllUser,
  DeleteUser,
  UpdateUser,
  AddEntryKey,
  DeleteKey,
  EditKey,
  getKey,
}

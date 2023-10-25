import { MessegeModel } from "../models/MessegeModel.js";
import { closeDB, connectToTB } from "./DB.js";
import {
  uniqueNamesGenerator,
  colors,
  animals,
  NumberDictionary,
} from "unique-names-generator";

const randomName = () =>
  uniqueNamesGenerator({
    dictionaries: [
      colors,
      animals,
      NumberDictionary.generate({ min: 1, max: 99 }),
    ],
    style: "lowerCase",
    separator: "-",
  });

const pushMessege = async (text) => {
  try {
    await connectToTB();
    const messege = new MessegeModel({
      name: randomName(),
      text: text,
    });
    await messege.save();
  } catch (e) {
    console.log(e);
  } finally {
    await closeDB();
  }
};

const updateUpvote = async (_id, action) => {
  try {
    await connectToTB();
    let inc;

    if (action === "up") inc = 1;
    else inc = -1;
    const newDoc = await MessegeModel.findOneAndUpdate(
      { _id: _id },
      { $inc: { upvotes: inc } },
      { returnOriginal: false }
    );
    return newDoc;
  } catch (e) {
    console.log(e);
  } finally {
    await closeDB();
  }
};

const getMesseges = async () => {
  try {
    await connectToTB();
    const data = await MessegeModel.find({}).sort({ upvotes: -1 });
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    await closeDB();
  }
};

export { pushMessege, updateUpvote, getMesseges };

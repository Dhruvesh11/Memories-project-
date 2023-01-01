import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  try {
    console.log("hi");
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  try {
    const post = req.body;
    console.log(post);
    const newPost = new PostMessage({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString,
    });
    // const post=req.body;
    console.log(newPost);

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(408).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    console.log("hi");
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("no post with that id");
    const updatePost = await PostMessage.findByIdAndUpdated(
      _id,
      { ...post, _id },
      { new: true }
    );
    res.json(updatePost);
  } catch {
    console.log(error);
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");
  res.json({ message: "post deleted successfully" });
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const post = await PostMessage.findByid(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatePost = await PostMessage.findByIdAndUpdated(id, post, {
    new: true,
  });
  res.json(updatePost);
};

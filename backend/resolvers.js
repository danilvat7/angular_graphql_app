import mongoose from "mongoose";
import courseModel from "./models/course";

const resolvers = {
    Query: {
        allCourses: (root, {
            searchTerm
        }) => {
            if (searchTerm !== "")
                return courseModel.find({
                    $text: {
                        $search: searchTerm
                    }
                }).sort({
                    voteCount: "desc"
                });
            else
                return courseModel.find().sort({
                    voteCount: "desc"
                });
        },
        course: (root, {
            id
        }) => {
            return courseModel.findOne({
                id
            });
        }
    },
    Mutation: {
        upvote: (root, {
            id
        }) => {
            return courseModel.findOneAndUpdate({
                id
            }, {
                $inc: {
                    "voteCount": 1
                }
            }, {
                returnNewDocument: true
            });
        },
        downvote: (root, {
            id
        }) => {
            return courseModel.findOneAndUpdate({
                id
            }, {
                $inc: {
                    "voteCount": -1
                }
            }, {
                returnNewDocument: true
            });
        },
        addCourse: (root, {
            title,
            author,
            description,
            topic,
            url
        }) => {
            const course = new courseModel({
                title,
                author,
                description,
                topic,
                url
            });
            return course.save();
        }
    }
};

export default resolvers;
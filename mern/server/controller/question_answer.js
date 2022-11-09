import QA from "../models/question_answer.js"
import asyncHandler from "express-async-handler";

export const getQA = asyncHandler(async(req, res) => {

    const qa = await QA.findById(req.params.id);

    if(!qa){
        res.status(400).json("No Qa Exists with Given Session ID")
    }
    else{
        res.status(200).json(qa)
    }
})

export const createQA = asyncHandler( async(req, res) => {

    const question = req.body.question
    const intent = req.body.intent
    // const level = req.body.intent
    const children = req.body.children

    const qa = await QA.create({
        question,
        intent,
        // level,
        children
    });

    try {
        res.status(200).json({
            id: qa.id
        });
      } catch {
        res.status(400).json("Invalid QA Data");
      }

})

export const deleteQA = asyncHandler( async(req, res) => {

    try{
        const qa = await QA.findByIdAndDelete(req.params.id)
        res.status(200).json(qa)
    } catch(error){
        res.status(404).json("Unable to Delete QA")
    }
})

export const updateQA = asyncHandler(async(req, res) => {

    const qa = await QA.findById(req.params.id)
    const question = req.body.question
    const intent = req.body.intent
    // const level = req.body.level
    const children = req.body.children

    if(!qa){
        res.status(401).json("QA not Found")
    }

    try{
        if(question){
            qa.question = question
        }
        if(intent){
            qa.intent = intent
        }
        // if(level){
        //     qa.level = level
        // }
        if(children){
            qa.children = children
        }
        qa.save()
        res.status(200).json(qa.id)
    } catch(error){
        res.status(400).json("Invalid Input Fields")
    }
})
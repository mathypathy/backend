const express = require('express')
const productSchema = require('../schemas/productSchema')
const controller = express.Router()
const ProductSchema = require('../schemas/productSchema')


controller.route('/').get(async (req, res,) => {
    const products=[]
    const list = await productSchema.find()
    if (list){
        for(let product of list){
            products.push({
                articleNumber: product._id,
                name: product.name, 
                price: product.price,
                category: product.category,
                imageName: product.imageName, 
                rating: product.rating 
        }) }
        res.status(200).json(products)

    } else  
        res.status(400).json()
})

controller.route('/:tag').get(async(req,res) =>{
    const products=[]
    const list = await productSchema.find({tag:req.params.tag})
    if (list){
        for(let product of list){
            products.push({
                articleNumber: product._id,
                name: product.name, 
                price: product.price,
                category: product.category,
                imageName: product.imageName, 
                rating: product.rating 
        }) }
        res.status(200).json(products)

    } else  
        res.status(400).json()
})

controller.route('/:tag/:take').get(async(req,res) =>{
    const products =[]
    const list = await productSchema.find({tag: req.params.tag}).limit(req.params.take)
    if(list) {
        for(let product of list){
            products.push({
                articleNumber:product._id,
                name: product.name, 
                price: product.price,
                category: product.category,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})


controller.route('/product/details/:articleNumber').get(async(req,res,)=>{
        const product = await productSchema.findById(req.params.articleNumber)
        if (product){
            res.status(200).json({
                articleNumber: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        else 
            res.status(404).json()
           
    
})




// secured routes

controller.route('/').post(async(req,res) =>{
    const { name, price, category, imageName, rating} = req.body
    if (!name || !price)
        res.status(400).json({text: 'name and price is required.'})
    
    const itemExists = await productSchema.findOne({name})
    if(itemExists)
        res.status(409).json({text: 'a product with the same name already exists.'})

    else{
        const product = await productSchema.create({
            name, 
            price,
            category,
            imageName,
            rating
        })
        if (product)
            res.status(201).json({text:`Product was created successfully. Your product id is: ${product._id}`})
        else
            res.status(400).json({text:'something went wrong when creating the product.'})
    }
})

controller.route('/:articleNumber').delete(async(req,res) =>{
    if (!req.params.articleNumber)
        res.status(400).json('No article number was specified.')

    else {
        const item = await productSchema.findById(req.params.articleNumber)
        if (item){
            await productSchema.remove(item)
            res.status(200).json({text: `product with article number: ${req.params.articleNumber} was deleted successfully.`})
        }
        else {
            res.status(404).json()({text: `product with article number ${req.params.articleNumber} was not found.`})
        }
    }

})

controller.route('/:product/:details/:articleNumber').put(async(req,res) => {
    const {name, price, category, imageName, rating} = req.body
    const putted_Product = ({name, price, category, imageName, rating})
    const existing_Product = await productSchema.findById(req.params.articleNumber)
    if (existing_Product){
        const put_Product = await productSchema.updateOne({_id: req.params.articleNumber}, putted_Product)
        if(put_Product)
            res.status(201).json({text: `Product: ${req.params.articleNumber}, was updated successfully.`})
        else
            res.status(400).json({text: 'The update failed. Please try again. '})
    }
    return(putted_Product)
})


module.exports = controller
//
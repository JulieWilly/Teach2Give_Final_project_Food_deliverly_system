const verifyProduct = async(req, res, next) => {
    try{
        const { productName,productDesc, productPrice} = req.body

        if (!productName) res.status(400).json("Please provide a product name.")
        if (!productDesc) res.status(400).json("Please provide a product description.")
        if (!productPrice) res.status(400).json("Please provide a product price.")
        next()

    } catch(error) {
        res.status(500).json({success:false,message: error.message})
    }
}

export default verifyProduct;
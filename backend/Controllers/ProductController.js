

const get_products = (req, res) => {
    return res.status(200).json({
        message: [
            {
                "name": "mobile",
                "price": "10000"
            },
            {
                "name": 'tv',
                "price": "20000"
            }
        ],
        success: true
    })
}

module.exports = {
    get_products
}
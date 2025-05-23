require("dotenv").config()
const express = require("express")
const cors = require("cors")
const passport = require('passport')
const adminAuth = require('./Routes/Admin/Auth/AdminAuth')
const categoryRoutes = require('./Routes/Admin/Category/CategoryRoute')
const SubcategoryRoutes = require('./Routes/Admin/SubCategory/SubCategoryRoute')
const sliderRoutes = require('./Routes/Admin/Slider/sliderRoute')
const couponRoutes = require('./Routes/Admin/Coupon/couponRoute')
const productRoutes = require('./Routes/Admin/Product/productRoute')
const userCategoryRoutes = require('./Routes/User/Category/categoryRoute')
const userSubCategoryRoutes = require('./Routes/User/Subcategory/subCategoryRoute')
const userProductRoutes = require('./Routes/User/Product/productRoute')
const userSliderRoutes = require('./Routes/User/Slider/sliderRoute')
const userCartController = require('./Routes/User/Cart/cartRoute')
const wishlistController = require('./Routes/User/Wishlist/wishlistRoute')
const addressController = require('./Routes/User/Address/addressRoute')
const userController = require('./Routes/User/Auth/UserAuth')
const profileController = require('./Routes/User/Profile/profileRoute')
const checkoutController=require('./Routes/User/Checkout/checkoutRoute')
// const userAdminController=require('./Routes/Admin/Users/userRoute')
const orderController = require('./Routes/User/Order/OrderRoute')
const DashboardController=require('./Routes/Admin/Dashboard/DashboardRoute')
const adminProfileController=require('./Routes/Admin/Profile/ProfileRoute')
const invoiceRoutes = require('./Routes/Admin/Invoice/invoiceRoute');
require('./Controllers/Admin/Coupon/couponController')
const cron = require('node-cron');
const WalkinCoupen = require('./Models/User/WalkinCoupen');
const sizeChartRoutes= require('./Routes/Admin/SizeChart/sizeChartRoutes')
const userSizeChartRoutes=require('./Routes/User/SizeChart/sizeChartRoutes')
const materialRoutes=require('./Routes/Admin/Material/MaterialRoutes')
const specificationRoutes=require('./Routes/Admin/Specifications/specificationRoutes')
const userCouponRoutes=require('./Routes/User/Coupon/couponRoutes')

const userCartRoutes = require('./Routes/User/Cart/cartRoute')
const wishlistRoutes = require('./Routes/User/Wishlist/wishlistRoute')
const addressRoutes = require('./Routes/User/Address/addressRoute')
const userRoutes = require('./Routes/User/Auth/UserAuth')
const profileRoutes = require('./Routes/User/Profile/profileRoute')
const checkoutRoutes=require('./Routes/User/Checkout/checkoutRoute')
const userAdminRoutes=require('./Routes/Admin/Users/userRoute')
const orderRoutes = require('./Routes/User/Order/OrderRoute')
const reviewRoutes  = require('./Routes/User/Review/reviewRoute')
const adminOrderRoutes = require('./Routes/Admin/Order/orderRoute')
const deliveryFeeRoutes = require('./Routes/Admin/DeliveryFee/deliveryFeeRoute')
const MainSearchRoutes = require('./Routes/User/Main Search/SearchRoutes');
const walk_inCoupon=require('./Routes/User/Walk-inCoupon/Walk-inRoute')
const webhookRoutes = require("./Routes/User/razorpay_webhook/webhookRoute");

const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
require('./DB/connection')
require('./config/passportConfigFacebook')
require('./config/passportConfigGoogle')
app.use(passport.initialize())

// admin Routes
app.use('/api/admin/auth',adminAuth)
app.use('/api/admin/category',categoryRoutes)
app.use('/api/admin/Subcategory',SubcategoryRoutes)
app.use('/api/admin/slider',sliderRoutes)
app.use('/api/admin/coupon',couponRoutes)
app.use('/api/admin/products',productRoutes)
// app.use('/admin/users',userAdminController)
app.use('/api/admin/dashboard',DashboardController)
app.use('/api/admin/profile',adminProfileController)
app.use('/api/admin/users',userAdminRoutes)
app.use('/api/admin/orderlist', adminOrderRoutes)
app.use('/api/admin/delivery-fee',deliveryFeeRoutes)
app.use('/api/admin/invoice',invoiceRoutes)
app.use('/api/admin/sizechart',sizeChartRoutes)
app.use('/api/admin/material',materialRoutes)
app.use('/api/admin/specification',specificationRoutes)



// USER ROUTES
app.use('/api/user/category',userCategoryRoutes)
app.use('/api/user/subCategory',userSubCategoryRoutes)
app.use('/api/user/products',userProductRoutes)
app.use('/api/user/slider',userSliderRoutes)
app.use('/api/user/cart',userCartRoutes)
app.use('/api/user/wishlist',wishlistRoutes)
app.use('/api/user/address',addressRoutes)
app.use('/api/user/auth',userRoutes)
app.use('/api/user/profile',profileRoutes)
app.use('/api/user/checkout',checkoutRoutes)
app.use('/api/user/order',orderRoutes)
app.use('/api/user/review',reviewRoutes)
app.use('/api/user/search',MainSearchRoutes)
app.use('/api/user/sizechart',userSizeChartRoutes)
app.use('/api/walkin/coupon',walk_inCoupon)
app.use("/api/webhook/razorpay", express.raw({ type: "application/json" }));
app.use('/api/webhook/razorpay', webhookRoutes);
app.use('/api/user/coupon',userCouponRoutes)


// test
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))




cron.schedule('0 * * * *', async () => {
    await WalkinCoupen.expireCoupons();
    console.log('Expired coupons updated.');
});

const PORT = 3005 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`server started listening at PORT ${PORT}`);
})
module.exports=((sequelize, DataTypes)=>{
    const Images = sequelize.define("Images",{
        imgUrl:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        imgName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Images;
})
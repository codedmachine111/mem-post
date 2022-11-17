module.exports=((sequelize, DataTypes)=>{
    const Comments = sequelize.define("Comments",{
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return Comments;
})
import mongoos from "mongoose";


export const connectDB = async () => {
    try {
        await mongoos.connect(process.env.MONGOOSE_URL);
        console.log('Connected with Database!..');
    }
    catch (error) {
        console.log('Error in connecting Database! ', error);
    }
}
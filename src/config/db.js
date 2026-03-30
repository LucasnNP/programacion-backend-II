import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGODB);
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.log("Error al conectar a MongoDB:", error.message);
    process.exit(1); //en el exit se pone 0 si la ejecución fue exitosa, y un 1 si hubo un error
  }
};

export default connectMongoDB;

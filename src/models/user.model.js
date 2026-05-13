import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      //verificar formato de correo con expresión regular
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingrese un correo electrónico válido",
      ],
    },
    age: { type: Number, required: true },
    password: {
      type: String,
      required: true,
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;

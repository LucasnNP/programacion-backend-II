import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 20,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, trim: true, default: "product.jpg" },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    stock: { type: Number, required: true, min: 0 },
    status: { type: Boolean, default: true },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Books", "Home", "Toys"],
    },
  },
  { timestamps: true },
);

// Index para optimizar búsquedas
productSchema.index({ category: 1 });
productSchema.index({ title: 1 }, { unique: true });
productSchema.index({ description: "text" });
productSchema.index({ code: 1 }, { unique: true });
productSchema.index({ price: 1 });
// Índice compuesto para consultas frecuentes por categoría y precio
productSchema.index({ category: 1, price: -1 });

// Plugins
productSchema.plugin(paginate);

const Product = mongoose.model("Product", productSchema);

export default Product;

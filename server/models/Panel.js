import mongoose from "mongoose";

const panelSchema = new mongoose.Schema({
  type: { type: String, enum: ["nodejs", "python", "minecraft", "custom"], required: true },
  ownerName: { type: String },
  ownerEmail: { type: String },
  username: { type: String },
  password: { type: String },
  ram: { type: String }, // e.g. '1 Go' or 'Illimité'
  cpu: { type: String }, // e.g. '40%' or '∞'
  disk: { type: String }, // e.g. '1000 MB' or '∞'
  price: { type: Number, default: 0 },
  duration: { type: Number }, // jours
  pteroServer: { type: Object, default: null }, // raw response from Pterodactyl
  status: { type: String, enum: ["pending", "active", "expired", "deleted"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
});

panelSchema.pre("save", function (next) {
  if (!this.expiresAt && this.duration) {
    this.expiresAt = new Date(Date.now() + this.duration * 24 * 60 * 60 * 1000);
  }
  next();
});

export default mongoose.model("Panel", panelSchema);

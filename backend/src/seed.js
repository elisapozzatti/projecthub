import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Project from "./models/Project.js";
import Organization from "./models/Organization.js";

async function seed() {
  await mongoose.connect(
    "mongodb+srv://elisapozzatti_db_user:elisa2004@f1box.4xamytz.mongodb.net/mini-saas",
  );

  await Organization.deleteMany({});
  await User.deleteMany({});
  await Project.deleteMany({});

  const hashedPassword = await bcrypt.hash("password123", 10);

  //organizzazioni
  const org1 = await Organization.create({ name: "Apple" });
  const org2 = await Organization.create({ name: "Milka" });

  //utenti
  const admin1 = await User.create({
    name: "Mario Boss",
    email: "admin@apple.com",
    password: hashedPassword,
    role: "superuser",
    organizationId: org1._id,
    organizationName: "Apple",
  });
  const emp1 = await User.create({
    name: "Luigi Dipendente",
    email: "luigi@apple.com",
    password: hashedPassword,
    role: "userdipendente",
    organizationId: org1._id,
    organizationName: "Apple",
  });
  const admin2 = await User.create({
    name: "Luigi Boss",
    email: "admin@milka.com",
    password: hashedPassword,
    role: "superuser",
    organizationId: org2._id,
    organizationName: "Milka",
  });
  const emp2 = await User.create({
    name: "Mario Dipendente",
    email: "mario@milka.com",
    password: hashedPassword,
    role: "userdipendente",
    organizationId: org2._id,
    organizationName: "Milka",
  });

  await Project.create({ name: "iPhone 18", organizationId: org1._id });
  await Project.create({ name: "ChocoCake", organizationId: org2._id });

  console.log("Database Popolato!");
  process.exit();
}
seed();

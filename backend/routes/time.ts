import { Router } from "express";
import { Controller_Time } from "../app/controllers/controller_time";

const time = Router();

time.get("/read", Controller_Time.read_time);
time.get("/find/:nome", Controller_Time.find_time);
time.post("/create", Controller_Time.create_time);
time.put("/update", Controller_Time.update_time);
time.delete("/delete", Controller_Time.delete_time);

export { time };
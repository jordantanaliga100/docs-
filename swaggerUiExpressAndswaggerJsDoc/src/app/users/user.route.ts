import express, { Router } from "express";
import userController from "./user.controller";
const router = express.Router();

// MODE TWO
router
  .route("/")
  .get(userController.getAll)
  .post((req, res) => {
    // Handle POST request to root
  });

router
  .route(":id")
  .get(userController.getById)
  .patch((req, res) => {
    // Handle PATCH request for resource with ID
  })
  .delete((req, res) => {
    // Handle DELETE request for resource with ID
  });

// Export the router
const UserRoutes: Router = router;
export default UserRoutes;

import { Router } from "express";
const router = Router();
import {
    loginUser,
    registerUser,
    logoutUser,
    profileUser,
    imageProfile,
    verifyToken,
    addStories,
    archivedStories,
    addPublications,
    reactionLove,
    deleteStories,
    comments,
    deleteComment,
    refreshToken,
    getPublications,
    getProfileImage,
    getProfile,
    getAllPublications,
    followPerson,
    postMessage,
    getMessage,
    addPublicationsVideo,
    updateProfileReactionsLove 
} from "../controllers/auth.controller.js";
import {
    authRequired,
    authRequiredCompany,
} from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import {
    registerSchema,
    loginSchema,
    CompanyShema,
    loginCompanyShema,
} from "../schemas/auth.schemas.js";

router.post("/msg", postMessage);
router.post("/registerUser", validateSchema(registerSchema), registerUser);
router.post("/loginUser", validateSchema(loginSchema), loginUser);
router.post("/logoutUser", logoutUser);
router.post("/publications", addPublications);
router.post("/reactionLike", reactionLove);
router.post("/imageProfile", imageProfile);
router.post("/addStories", addStories);
router.post("/comment", comments);
router.post("/refreshToken", refreshToken);
router.post("/followPerson", followPerson)
router.post("/addPublicationVideo", addPublicationsVideo)
router.get("/profileUser", authRequired, profileUser);
router.get("/verify", authRequired, verifyToken);
router.get("/getPublications", getPublications);
router.get("/getProfileImage", getProfileImage);
router.get("/getAllPublications", getAllPublications);
router.get("/getMessages", getMessage)
router.post("/getProfile", getProfile);
router.put("/archivedStory", archivedStories);
router.put("/deleteStories", deleteStories);
router.put("/updateReactions", authRequired, updateProfileReactionsLove)
router.delete("/deleteComment", deleteComment);
export default router;

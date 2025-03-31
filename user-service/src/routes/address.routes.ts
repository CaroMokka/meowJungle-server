import { Router } from "express"
import { createAddress, getAddressesClient, getAddressById , updateAddress, deleteAddress } from "../controllers/address.controllers"

const router = Router()

router.post("/:clientId/addresses", createAddress)
router.get("/:clientId/addresses", getAddressesClient)
router.get("/:clientId/addresses/:addressId", getAddressById)
router.put("/:clientId/addresses/:addressId", updateAddress)  
router.delete("/:clientId/addresses/:addressId", deleteAddress)

export default router;
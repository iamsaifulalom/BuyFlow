import { extendedZod  as z} from "../../common/docs/extend-zod.js";
import { mongooseId } from "../../common/schema/schema.field.js";

export const cartItemSchema = z.object({
    product: mongooseId,
    quantity: z.number()
})




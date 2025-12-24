import { Asset } from "./asset.model.js"

export const assetRepo = {
    createAsset: async (data) => {
        const asset = new Asset(data);
        const assetDoc =  await asset.save();
        return assetDoc.toObject()
    }
}
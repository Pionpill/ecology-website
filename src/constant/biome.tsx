import { BiomeCategory } from "@ecology-mc/data";
import { CloudFog, Eye, Fish, Flower2, LineSquiggle, Mountain, Skull, SunDim, TreeDeciduous, Waves } from "lucide-react";
import { ReactNode } from "react";

export const biomeCategoryIcons: Record<BiomeCategory, ReactNode> = {
    forest: <TreeDeciduous />,
    ocean: <Waves />,
    drought: <SunDim />,
    mountain: <Mountain />,
    plain: <Flower2 />,
    nether: <Skull />,
    cave: <LineSquiggle />,
    swamp: <CloudFog />,
    river: <Fish />,
    the_end: <Eye />
}